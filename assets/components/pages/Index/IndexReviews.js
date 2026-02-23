import React, { useEffect, useState } from "react";

import { LazyLoadBackgroundImage } from "../../global/All/LazyLoadBackgroundImage";

import {MOVIE_POSTER_PH, TV_SHOW_POSTER_PH} from "@/assets/cdns/imgsCDN"

import sampleMovieTvData from "@/public/data/sampleMovieTvData.json";

import styles from "../../../styles/modules/Index/Index.module.css";


const TestSampleData = ({data}) => {
    return (
        <div>

            {data.map((item) => (
                <div key={item.objectID}>

                    <p>ID: {item.objectID}</p>
                    <p>Name: {item.objectName}</p>
                    <p>Type: {item.objectType}</p>
                    <p>Route: {item.objectRoute}</p>
                    <p>Storage Key: {item.objectStorageKey}</p>
                    <img src={item.objectPoster}/>

                </div>
            ))}

        </div>
    )
}

export const IndexReviews = () => {
    return (
        <section id="indexReviews" className={`${styles.index_reviews}`}></section>
    )
}