/**
 * 
 *  This is the CloseMobileNavMenu function
 * 
 */

import ClickAndScrollStatus from "../Global/dom/ClickAndScrollStatus";
import RemoveStorageVariable from "../Global/storage/RemoveStorageVariable";

export default function CloseMobileNavMenu() {
    const TOGGLER = document.getElementById("mobileNavToggler");
    const CLOSER = document.getElementById('mobileNavCloser');
    const MENU = document.getElementById("mobileNavMenu");
    const DARKEN = document.getElementById("darkenOverlay");

    // CLOSER.style.display = 'none';
    // TOGGLER.style.display = 'block';
    
    DARKEN.style.opacity = 0;
    DARKEN.style.visibility = 'hidden';

    MENU.style.transition = "ease-in-out";

    setTimeout(() => {
        MENU.style.marginRight = "-100%";
    }, 100)

    setTimeout(() => {

        DARKEN.style.display = "none";
        MENU.style.display = 'none';

    }, 450)


    ClickAndScrollStatus("Allow");

    RemoveStorageVariable("session", "Mobile Nav Menu Opened");
}