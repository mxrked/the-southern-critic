/**
 * 
 *  This is the Mobile Nav Menu
 * 
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";


import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

import CloseMobileNavMenu from "@/assets/functions/Nav/CloseMobileNavMenu";
import LogoutUser from "@/assets/functions/Global/account/LogoutUser";

import styles from "../../../../styles/modules/Nav/Nav.module.css";

export const MobileNavMenu = ({isLoggedInValue}) => {
    return (
        <div id="mobileNavMenu" className={styles.mobile_nav_menu}>

            <button id="mobileNavCloser" onClick={CloseMobileNavMenu}><FaTimes/></button>

            <ul>

                <li>

                    <a href="/reviews" onClick={CloseMobileNavMenu}>
                                        
                        <span>REVIEWS</span>
                                        
                    </a>

                </li>

                <li>

                    <a href="//profile#watchlist" onClick={CloseMobileNavMenu}>
                                        
                        <span>WATCHLIST</span>
                                        
                    </a>

                </li>
                                    
                {isLoggedInValue ? (
                    <li className={styles.black_button}>

                        <a href="/profile" onClick={CloseMobileNavMenu}>
                                            
                            <span>PROFILE</span>

                            <LazyLoadImage src={sessionStorage.getItem("Logged In Pfp")}/>
                                            
                        </a>

                    </li>
                ) : (
                    <li className={styles.black_button}>

                        <a href="/login_register" onClick={CloseMobileNavMenu}>
                                            
                            <span>LOGIN</span>
                                            
                        </a>

                    </li>
                )}

                {isLoggedInValue && (
                    <li onClick={() => {
                        CloseMobileNavMenu();

                        setTimeout(() => {
                            LogoutUser();
                        }, 50);
                    }}>

                        <a>

                            <RiLogoutBoxRLine/> &nbsp; LOGOUT

                        </a>

                    </li>
                )}

            </ul>

        </div>
    )
}