/**
 * 
 *  This is the Review Main
 * 
 */

import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "../../../styles/modules/Reviews/Reviews.module.css";


const renderRatingStars = (rating) => {
    // If no rating
    if (!rating) return null;

    const FULL_STARS = Math.floor(rating);
    const HAS_HALF_STAR = rating % 1 !== 0;
    const EMPTY_STARS = 5 - FULL_STARS - (HAS_HALF_STAR ? 1 : 0);

    return (
        <>
            {"★".repeat(FULL_STARS)}
            {HAS_HALF_STAR && "½"}
            {"☆".repeat(EMPTY_STARS)}
        </>
    );
};


export const ReviewMain = ({review}) => {

    /**
     * 
     *  0: reviewCreatedTime
     *  1: reviewName 
     *  2: reviewPoster
     *  3: reviewRating
     *  4: reviewText
     *  5: reviewItemType
     *  6: reviewItemRoute
     *  7: reviewStorageKey
     * 
     */

    return (
        <div className={`${styles.review_main}`}>

            <div className={`${styles.review_main_inner}`}>

                <div className={`${styles.review_main_inner_top}`}>

                    <LazyLoadImage src={review[2]} alt={`TheSouthernCritic - Poster for ${review[1]}`}/>

                    <span className={`${styles.created_date}`}>Created {review[0]}</span>

                    <h1>{review[1]}</h1>

                    <span className={`${styles.review_rating}`}>{renderRatingStars(review[3])}</span>

                </div>

                <div className={`${styles.review_text_holder}`}>

                    {review[4]}

                </div>

            </div>

        </div>
    )
}