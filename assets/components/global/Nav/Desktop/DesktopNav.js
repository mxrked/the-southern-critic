/**
 * 
 *  This is the Desktop Nav
 * 
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Logo } from "../Both/Logo";

import styles from "../../../../styles/modules/Nav/Nav.module.css";

export const DesktopNav = ({isLoggedInValue}) => {

    const router = useRouter();

    return (
        <nav id="desktopNav" className={`${styles.desktop_nav}`}>

            <div className={`${styles.desktop_nav_inner}`}>

                <div className={`${styles.desktop_nav_inner_box} container-fluid`}>

                    <div className={`${styles.desktop_nav_inner_row} row`}>

                        <div className={`${styles.desktop_nav_L} ${styles.desktop_nav_side} col-lg-6 col-md-6 col-sm-6 col-xs-6`}>

                            <div className={`${styles.desktop_nav_side_cnt}`}>

                                <a href="/">
                                
                                    <Logo/>
                                
                                </a>

                            </div>

                        </div>

                        <div className={`${styles.desktop_nav_R} ${styles.desktop_nav_side} col-lg-6 col-md-6 col-sm-6 col-xs-6`}>

                            <div className={`${styles.desktop_nav_side_cnt}`}>

                                <ul>

                                    <li>

                                        <a href="/reviews">
                                        
                                            <span>REVIEWS</span>

                                            <span className={`${styles.link_bar}`}/>
                                        
                                        </a>

                                    </li>

                                    <li>

                                        <a href="/watchlist">
                                        
                                            <span>WATCHLIST</span>
                                            
                                            <span className={`${styles.link_bar}`}/>
                                        
                                        </a>

                                    </li>
                                    
                                    {isLoggedInValue ? (
                                        <li className={styles.black_button}>

                                            <a href="/profile">
                                            
                                                <span>PROFILE</span>
                                            
                                            </a>

                                        </li>
                                    ) : (
                                        <li className={styles.black_button}>

                                            <a href="/login_register">
                                            
                                                <span>LOGIN</span>
                                            
                                            </a>

                                        </li>
                                    )}

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>
            
            </div>

        </nav>
    )

}