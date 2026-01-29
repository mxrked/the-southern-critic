/**
 * 
 *  This is used to Return the user device value
 * 
 */

export default function ReturnUserDevice() {

    const DESKTOP_DEVICE = sessionStorage.getItem("Desktop Device");
    const MOBILE_DEVICE = sessionStorage.getItem("Mobile Device");


    if (DESKTOP_DEVICE) {
        return "Desktop Device";
    }

    if (MOBILE_DEVICE) {
        return "Mobile Device";
    }

}