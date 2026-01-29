/**
 *
 *  This is used to check what device the user is on
 *
 *  @param {boolean} mobile - The mobile variable
 *  @param {boolean} desktop - The desktop variable
 *
 */

// Function imports
import DeclareStorageVariable from "../storage/DeclareStorageVariable";
import RemoveStorageVariable from "../storage/RemoveStorageVariable";
import DarkenOverlayStatus from "../../Nav/DarkenOverlayStatus";


export default function CheckUserDevice(mobile, desktop) {

  const width = window.innerWidth;

  if (width <= 991) {
    // MOBILE
    mobile = true;
    desktop = false;

    RemoveStorageVariable("session", "Desktop Device");
    DeclareStorageVariable("session", "Mobile Device", true);

    // This will check if the user already has the mobile nav menu opened before changing orientations
    if (sessionStorage.getItem("Mobile Nav Menu Opened")) {

        DarkenOverlayStatus("Display");

        document.getElementById("mobileNavMenu").style.display = 'block';
        
    }

  } else {
    // DESKTOP (992+)
    mobile = false;
    desktop = true;

    RemoveStorageVariable("session", "Mobile Device");
    DeclareStorageVariable("session", "Desktop Device", true);

    // This will check if the user already has the mobile nav menu opened before changing orientations
    if (sessionStorage.getItem("Mobile Nav Menu Opened")) {

        DarkenOverlayStatus("Hide");


    }

  }

  return { mobile, desktop };
}