import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { FaSearch } from "react-icons/fa";

import { LazyLoadBackgroundImage } from "../../global/All/LazyLoadBackgroundImage";

import {MOVIE_POSTER_PH, TV_SHOW_POSTER_PH} from "@/assets/cdns/imgsCDN"

import { addToAccountWatchlist } from "@/database/setters/addToAccountWatchlist";

import sampleMovieTvData from "@/public/data/sampleMovieTvData.json";

import styles from "../../../styles/modules/Index/Index.module.css";


const IndexReview = ({item, isLoggedInValue}) => {

    const itemRef = useRef();
    const router = useRouter();

    // Adding a class to the item based on the objectType value
    useEffect(() => {

        const IRC = itemRef.current;

        if (IRC) {

            
            // If movie..
            if (item.objectType === "MOVIE") {
                
                // Removing the opposite class
                if (IRC.classList.contains("tvshow-review")) {
                    IRC.classList.remove("tvshow-review")
                }

                // Adding objectType class
                IRC.classList.add("movie-review");
            }

            // If tvshow..
            if (item.objectType === "TVSHOW") {

                // Removing the opposite class
                if (IRC.classList.contains("movie-review")) {
                    IRC.classList.remove("movie-review")
                }

                // Adding objectType class
                IRC.classList.add("tvshow-review");
            }
        }
    }, [item.objectType])

    return (
        <div className={`${styles.index_review} review col-lg-4 col-md-4 col-sm-6 col-xs-12`} ref={itemRef}>

            <LazyLoadBackgroundImage image_url={item.objectPoster} image_alt={`TheSouthernCritic - ${item.objectName} poster.`} style_className={styles.index_review_poster}/>
            
            <div className={`${styles.index_review_darken}`} >

                <div className={`${styles.index_review_darken_text}`}>

                    <span className={`${styles.review_type}`}>{item.objectType}</span>

                    <span className={`${styles.review_name}`}>{item.objectName}</span>

                    <div>
                        <button style={{cursor: "pointer"}} onClick={(e) => {
                            router.push(item.objectRoute);
                        }}>Read Review</button>

                        {isLoggedInValue ? (
                            <button onClick={async (e) => {
                                // Add item to watchlist
                                await addToAccountWatchlist(item.objectStorageKey);
                            }}>Add To Watchlist</button>
                        ) : null}
                    </div>

                </div>

            </div>

        </div>
    )
}


export const IndexReviews = ({reviewItems, isLoggedInValue}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredReviews, setFilteredReviews] = useState(reviewItems);

    const styleFilterBtn = (btn) => {

        // Resetting the buttons
        document.querySelectorAll(".btn-fade-class").forEach((button) => {
            button.style.color = "#222222";
            button.style.backgroundColor = "transparent";
            button.style.opacity = 1;
            button.style.pointerEvents = "auto";
        });

        btn.style.opacity = 0.6;
        btn.style.backgroundColor = "#222222";
        btn.style.color = 'white';
        btn.style.pointerEvents = "none";

    }

    // This is used to 
    const displayReviewItems = (items) => {
        items.forEach((item) => {
            item.style.display = 'block';
        })
    }

    const buttonFilter = (showAll, reviewType) => {
        const REVIEWS = document.querySelectorAll(".review");

        // Displaying movies or tv shows if the user is not clicking the All button
        if (!showAll || showAll === null || showAll === undefined) {
            REVIEWS.forEach((review) => {
                review.style.display = 'none';
            })


            // Displaying movies
            if (reviewType === "MOVIES") {

                // Grabbing all movies reviews
                if (document.querySelector(".movie-review")) {
                    const MOVIES = document.querySelectorAll(".movie-review");

                    displayReviewItems(MOVIES);
                }

            }

            // Displaying tv shows
            if (reviewType === "TVSHOWS") {

                // Grabbing all tv show reviews
                if (document.querySelector(".tvshow-review")) {
                    const TVSHOWS = document.querySelectorAll(".tvshow-review");

                    displayReviewItems(TVSHOWS);
                }

            }

        } else {

            // Display all of the reviews
            REVIEWS.forEach((review) => {
                review.style.display = 'block';
            })
        }
    }

    // This is for the search field
    const searchFilter = (value) => {
        setSearchTerm(value); // Setting the current input value

        if (!value || value.trim() === "") {
            setFilteredReviews(reviewItems);
            return;
        }

        // Filtering the reviews based off the name
        const FILTERED_REVIEWS = reviewItems.filter((item) => item.objectName.toLowerCase().includes(value.toLowerCase()));

        // Setting the reviews to be displayed filtered on the frontend
        setFilteredReviews(FILTERED_REVIEWS);
    }

    // Making the All button faded by default
    useEffect(() => {

        const ALL_REVIEWS_FILTER_BTN = document.querySelectorAll(".btn-fade-class")[0];
        styleFilterBtn(ALL_REVIEWS_FILTER_BTN)

    }, [])


    return (
        <section id="indexReviews" className={`${styles.index_reviews}`}>

            <div className={`${styles.index_reviews_inner}`}>

                <h1>Is It Worth Watchin'?</h1>

                <div className={`${styles.index_reviews_filters}`}>

                    <div className={`${styles.index_reviews_filters_box} container-fluid`}>

                        <div className={`${styles.index_reviews_filters_row} row`}>

                            <div className={`${styles.index_reviews_filters_side} ${styles.index_reviews_filter_L} col-lg-6 col-md-6 col-sm-6 col-xs-12`}>

                                <div className={`${styles.index_reviews_filters_side_cnt}`}>

                                    <ul>

                                        <li>

                                            <button id="allReviewsBtn" className="btn-fade-class" onClick={(e) => {
                                                styleFilterBtn(e.currentTarget);

                                                buttonFilter(true);
                                            }}>ALL</button>

                                        </li>

                                    
                                        <li>

                                            <button id="movieReviewsBtn" className="btn-fade-class" onClick={(e) => {
                                                styleFilterBtn(e.currentTarget);

                                                buttonFilter(null, "MOVIES");
                                            }}>MOVIES</button>

                                        </li>


                                        <li>

                                            <button id="tvReviewsBtn" className="btn-fade-class" onClick={(e) => {
                                                styleFilterBtn(e.currentTarget);

                                                buttonFilter(null, "TVSHOWS");
                                            }}>TV SHOWS</button>

                                        </li>
                                    </ul>

                                </div>

                            </div>

                            <div className={`${styles.index_reviews_filters_side} ${styles.index_reviews_filter_R} col-lg-6 col-md-6 col-sm-6 col-xs-12`}>

                                <div className={`${styles.index_reviews_filters_side_cnt}`}>

                                    <div className={`${styles.reviews_search}`}>

                                        <input type="text" id="reviewsSearchInput" placeholder="Search" onChange={(e) => {

                                            styleFilterBtn(document.getElementById("allReviewsBtn"));

                                            searchFilter(e.target.value);

                                        }}/>

                                        <button onClick={() => {

                                            styleFilterBtn(document.getElementById("allReviewsBtn"));

                                        }}><FaSearch className={`${styles.icon}`}/></button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className={`${styles.index_reviews_main}`}>

                    <div className={`${styles.index_reviews_main_box} container-fluid`}>

                            <div className={`${styles.index_reviews_main_row} row`}>

                                {filteredReviews.map((item) => (
                                    <IndexReview item={item} isLoggedInValue={isLoggedInValue}/>
                                ))}

                            </div>

                    </div>

                </div>

            </div>

        </section>
    )
}