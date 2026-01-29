/**
 * 
 *  This is the Nav Logo
 * 
 */

import { LazyLoadImage } from "react-lazy-load-image-component";

import { MAIN_BLACK_LOGO } from "@/assets/cdns/logosCDN";

import styles from "../../../../styles/modules/Nav/Nav.module.css";

export const Logo = () => {
    return (
        <LazyLoadImage className={`${styles.logo}`} src={MAIN_BLACK_LOGO} alt={"The Southern Critic - TSC Logo."}/>
    )
}