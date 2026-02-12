import React, { useEffect, useState } from "react";

import { LazyLoadBackgroundImage } from "../../global/All/LazyLoadBackgroundImage";

import {HALLOWEEN_POSTER, ITS_A_WONDERFUL_LIFE_POSTER, SHAWSHANK_REDEMPTION_POSTER, SHUTTER_ISLAND_POSTER, SLINGBLADE_POSTER, THE_DARK_KNIGHT_POSTER, BETTER_CALL_SAUL_POSTER, BREAKING_BAD_POSTER, GAME_OF_THRONES_POSTER, JUSTIFIED_POSTER, THE_SOPRANOS_POSTER, YELLOWSTONE_POSTER} from "@/assets/cdns/imgsCDN"

import styles from "../../../styles/modules/Index/Index.module.css";

export const IndexTop = () => {

  const MOVIE_POSTERS = [
    HALLOWEEN_POSTER,
    ITS_A_WONDERFUL_LIFE_POSTER,
    SHAWSHANK_REDEMPTION_POSTER,
    SHUTTER_ISLAND_POSTER,
    SLINGBLADE_POSTER,
    THE_DARK_KNIGHT_POSTER,
  ];

  const TV_POSTERS = [
BETTER_CALL_SAUL_POSTER, BREAKING_BAD_POSTER, GAME_OF_THRONES_POSTER, JUSTIFIED_POSTER, THE_SOPRANOS_POSTER, YELLOWSTONE_POSTER
  ];

   return (
     <section id="indexTop" className={`${styles.index_top}`}>

        <div className={styles.poster_slider_holder}>
            <div className={`${styles.poster_slider_fade}`}>

                <div className={`${styles.poster_slider} ${styles.slider_one}`}>
                    
                    {Array(3).fill(0).map((_, groupIndex) => (
                        <div key={groupIndex} aria-hidden={groupIndex !== 0} className={styles.poster_slider_group}>
                        {MOVIE_POSTERS.map((poster, index) => (
                            <div key={index} className={styles.poster_slider_slide}>
                            <LazyLoadBackgroundImage image_url={poster} style_className={styles.poster}/>
                            </div>
                        ))}
                        </div>
                    ))}

                </div>

                <div className={`${styles.poster_slider} ${styles.slider_two}`}>
                    
                    {Array(3).fill(0).map((_, groupIndex) => (
                        <div key={groupIndex} aria-hidden={groupIndex !== 0} className={styles.poster_slider_group}>
                        {TV_POSTERS.map((poster, index) => (
                            <div key={index} className={styles.poster_slider_slide}>
                            <LazyLoadBackgroundImage image_url={poster} style_className={styles.poster}/>
                            </div>
                        ))}
                        </div>
                    ))}

                </div>

            </div>
        </div>

        <div className={`${styles.index_top_overlay}`}>

            <div className={`${styles.index_top_overlay_cnt}`}>

                <h1>Honest Reviews.<span><br/></span>No Sugarcoating.</h1>

                <p>Get honest, unbiased reviews of the newest movies and TV shows—so you know what’s worth adding to your watchlist.</p>

                <a href="/reviews">
                
                    <span>READ SOME REVIEWS</span>
                
                </a>

            </div>

        </div>

    </section>
   )
}