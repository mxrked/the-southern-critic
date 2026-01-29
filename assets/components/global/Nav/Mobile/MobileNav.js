/**
 * 
 *  This is the Mobile Nav
 * 
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FaBars, FaTimes } from "react-icons/fa";

// import DeclareStorageVariable from "@/assets/functions/Global/storage/DeclareStorageVariable";
// import RemoveStorageVariable from "@/assets/functions/Global/storage/RemoveStorageVariable";
// import ClickAndScrollStatus from "@/assets/functions/Global/dom/ClickAndScrollStatus";
// import { allowClickOnDis, allowScrollOnDis } from "@/assets/functions/Global/dom/AllowsOnDisallow";
import CloseMobileNavMenu from "@/assets/functions/Nav/CloseMobileNavMenu";
import OpenMobileNavMenu from "@/assets/functions/Nav/OpenMobileNavMenu";

import { Logo } from "../Both/Logo";

import styles from "../../../../styles/modules/Nav/Nav.module.css";


export const MobileNav = () => {

    const router = useRouter();

    return (
        <nav id="mobileNav" className={`${styles.mobile_nav}`}>

            <div className={`${styles.mobile_nav_inner}`}>

                <div className={`${styles.mobile_nav_inner_box} container-fluid`}>

                    <div className={`${styles.mobile_nav_inner_row} row`}>

                        <div className={`${styles.mobile_nav_L} ${styles.mobile_nav_inner_side} col-lg-6 col-md-6 col-sm-6 col-xs-6`}>

                            <div className={`${styles.mobile_nav_inner_side_cnt}`}>

                                <a href="/" onClick={CloseMobileNavMenu}>
                                
                                    <Logo/>
                                
                                </a>
                                
                            </div>

                        </div>
                        
                        <div className={`${styles.mobile_nav_R} ${styles.mobile_nav_inner_side} col-lg-6 col-md-6 col-sm-6 col-xs-6`}>

                            <div className={`${styles.mobile_nav_inner_side_cnt}`}>

                                <div className={`${styles.buttons_holder}`}>

                                    <button className={`${styles.toggler}`} id="mobileNavToggler" onClick={OpenMobileNavMenu}>

                                        <FaBars/>

                                    </button>

                                    {/* <button className={`${styles.closer}`} id="mobileNavCloser" onClick={CloseMobileNavMenu}>

                                        <FaTimes/>

                                    </button> */}

                                </div>

                            </div>
                            
                        </div>

                    </div>

                </div>

            </div>

        </nav>
    )

}