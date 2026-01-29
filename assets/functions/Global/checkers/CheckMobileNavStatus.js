/**
 * 
 *  This is the CheckMobileNavStatus function
 * 
 */

import DeclareStorageVariable from "../storage/DeclareStorageVariable";
import RemoveStorageVariable from "../storage/RemoveStorageVariable";

export default function CheckMobileNavStatus(status) {

    if (status === "Open") {
        DeclareStorageVariable("session", "Mobile Nav Opened", true);
    } else {
        RemoveStorageVariable("session", "Mobile Nav Menu Opened");
    }

}