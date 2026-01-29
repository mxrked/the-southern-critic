/**
 * 
 *  This is the OpenMobileNavMenu function
 * 
 */


import ClickAndScrollStatus from "../Global/dom/ClickAndScrollStatus";
import { allowClickOnDis, allowScrollOnDis } from "../Global/dom/AllowsOnDisallow";

import DeclareStorageVariable from "../Global/storage/DeclareStorageVariable";

import { ReturnScreenWidth } from "../Global/returns/ReturnScreenSize";


export default function OpenMobileNavMenu() {

    const SCREEN_WIDTH = ReturnScreenWidth();

    const TOGGLER = document.getElementById("mobileNavToggler");
    const CLOSER = document.getElementById('mobileNavCloser');
    const MENU = document.getElementById("mobileNavMenu");
    const DARKEN_OVERLAY = document.getElementById("darkenOverlay");

    // TOGGLER.style.display = 'none';
    // CLOSER.style.display = 'block';
    DARKEN_OVERLAY.style.display = 'block';
    MENU.style.display = 'block';

    MENU.style.transition = "1.5s ease-in-out";

    if (SCREEN_WIDTH < 992 && SCREEN_WIDTH > 768) {
        
        MENU.style.maxWidth = '500px'

        setTimeout(() => {

            DARKEN_OVERLAY.style.visibility = 'visible';
            DARKEN_OVERLAY.style.opacity = 1;

        }, 30)

        
        setTimeout(() => {
            
            MENU.style.marginRight = "0";
                
        }, 50)
    }

    if (SCREEN_WIDTH <= 768) {
        DARKEN_OVERLAY.style.visibility = 'visible';
        DARKEN_OVERLAY.style.opacity = 1;
        MENU.style.marginRight = "0";
        MENU.style.left = "100%"
        MENU.style.transform = "translateX(-100%)";
        MENU.style.maxWidth = '500px'
    }

    

    ClickAndScrollStatus("Disallow");

    allowClickOnDis(document.getElementById("mobileNav"));
    allowClickOnDis(document.getElementById("darkenOverlay"));
    allowClickOnDis(document.getElementById("mobileNavMenu"));
    allowScrollOnDis(document.getElementById("mobileNavMenu"));

    DeclareStorageVariable("session", "Mobile Nav Menu Opened", true);
}