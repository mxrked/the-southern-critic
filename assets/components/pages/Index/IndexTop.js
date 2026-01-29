/**
 * 
 *  This is the Index Top
 * 
 */

import { LazyLoadBackgroundImage } from "../../global/All/LazyLoadBackgroundImage";

import {HALLOWEEN_POSTER, ITS_A_WONDERFUL_LIFE_POSTER, SHAWSHANK_REDEMPTION_POSTER, SHUTTER_ISLAND_POSTER, SLINGBLADE_POSTER, THE_DARK_KNIGHT_POSTER, BETTER_CALL_SAUL_POSTER, BREAKING_BAD_POSTER, GAME_OF_THRONES_POSTER, JUSTIFIED_POSTER, THE_SOPRANOS_POSTER, YELLOWSTONE_POSTER} from "@/assets/cdns/imgsCDN"

import styles from "../../../styles/modules/Index/Index.module.css";

export const IndexTop = () => {
   return (
     <section id="indexTop" className={`${styles.index_top}`}>

        <div className={`${styles.poster_slider_bg}`}></div>

        <div className={`${styles.index_top_overlay}`}></div>

    </section>
   )
}