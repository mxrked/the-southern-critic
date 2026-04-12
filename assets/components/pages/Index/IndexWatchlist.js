import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { LazyLoadBackgroundImage } from "../../global/All/LazyLoadBackgroundImage";

import {WATCHLIST_BG} from "@/assets/cdns/bgsCDN";

import styles from "../../../styles/modules/Index/Index.module.css";

export const IndexWatchlist = ({isLoggedInValue}) => {

    const router = useRouter();

    return (
        <section id="indexWatchlist" className={`${styles.index_watchlist}`}>

            <div className={`${styles.index_watchlist_inner}`}>

                <div className={`${styles.index_watchlist_inner_box} container-fluid`}>

                    <div className={`${styles.index_watchlist_inner_row} row`}>

                        <div className={`${styles.index_watchlist_inner_side} ${styles.index_watchlist_L} col-lg-5 col-md-5 col-sm-5 col-xs-12`}>

                            <LazyLoadBackgroundImage image_url={WATCHLIST_BG} image_alt={`TheSouthernCritic - Watchlist Background.`} style_className={styles.lazyload_bg}/>

                        </div>

                        <div className={`${styles.index_watchlist_inner_side} ${styles.index_watchlist_R} col-lg-7 col-md-7 col-sm-7 col-xs-12`}>

                            <div className={`${styles.index_watchlist_inner_side_cnt}`}>

                                <h1>Never Miss a Flick.</h1>

                                <p>Make your own watchlist and never forget a movie or show you’re excited about.</p>

                                {isLoggedInValue ? (
                                    <button onClick={() => {
                                        router.push("/profile");
                                    }}>Create A Watchlist</button>
                                ) : (
                                    <button onClick={() => {
                                        router.push("/login_register");
                                    }}>Make An Account</button>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}