/**
 * 
 *  This is the DarkenOverlayStatus function
 * 
 */

import ClickAndScrollStatus from "../Global/dom/ClickAndScrollStatus";
import { allowClickOnDis, allowScrollOnDis } from "../Global/dom/AllowsOnDisallow";

export default function DarkenOverlayStatus(status) {
    if (status === "Display") {
        ClickAndScrollStatus("Disallow");

        allowClickOnDis(document.getElementById("mobileNav"));
        allowClickOnDis(document.getElementById("darkenOverlay"));
        allowScrollOnDis(document.getElementById("mobileNavMenu"));

        document.getElementById("darkenOverlay").style.display = 'block';
    } else {
        document.getElementById("darkenOverlay").style.display = 'none';
        document.getElementById("mobileNavMenu").style.display = 'none';
        allowClickOnDis(document.body);
        allowScrollOnDis(document.body);
    }
}