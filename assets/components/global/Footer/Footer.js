import React, { useEffect, useState } from "react";

import { MAIN_WHITE_LOGO } from "@/assets/cdns/logosCDN";

import { LuCopyright } from "react-icons/lu";

import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "../../../styles/modules/Footer/Footer.module.css";

export const Footer = () => {

    const CURRENT_YEAR = new Date().getFullYear();

    return (
        <footer className={`${styles.footer}`}>

            <div className={`${styles.footer_inner}`}>

                <div className={`${styles.footer_inner_box} container-fluid`}>

                    <div className={`${styles.footer_inner_row} row`}>

                        <div className={`${styles.footer_inner_side} col-12`}>

                            <div className={`${styles.footer_inner_side_cnt}`}>

                                <a href="/">
                                
                                    <LazyLoadImage src={MAIN_WHITE_LOGO} alt={`The Southern Critic - TSC Logo.`}/>
                                
                                </a>

                                <div className={`${styles.current_year}`}><LuCopyright className={`${styles.icon}`}/> 2026 - {CURRENT_YEAR}</div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    )
}