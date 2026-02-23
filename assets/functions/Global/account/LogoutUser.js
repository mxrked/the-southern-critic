/**
 * 
 *  This is used to logout the user
 * 
 */

import RemoveStorageVariable from "../storage/RemoveStorageVariable";

export default function LogoutUser() {

    if (sessionStorage.getItem("Logged In")) {

        RemoveStorageVariable("session", "Logged In");
        RemoveStorageVariable("session", "Logged In Username");
        RemoveStorageVariable("session", "Logged In Email");
        RemoveStorageVariable("session", "Logged In Pfp");
        // RemoveStorageVariable("session", "Logged In Watchlist");
        RemoveStorageVariable("session", "Logged In UID");

        window.location.reload();

    }

}