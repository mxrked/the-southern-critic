/**
 * 
 *  This is used to add a movie to the account watchlist
 * 
 */

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { thesoutherncriticdb, thesoutherncriticauth } from "../connectToDB";

export async function addToAccountWatchlist(itemStorageKey) {

    try {
        const currentUser = thesoutherncriticauth.currentUser;

        if (!currentUser) {
            alert("You must be logged in to add items to your watchlist.");
            return;
        }

        if (!itemStorageKey || !itemStorageKey.trim()) {
            alert("Invalid item storage key.");
            return;
        }

        const accountRef = doc(thesoutherncriticdb, "accounts", currentUser.uid);

        await updateDoc(accountRef, {
            accountWatchlist: arrayUnion(itemStorageKey)
        });

        alert("Added to watchlist!");
        console.log("✅ Added to watchlist:", itemStorageKey);
    } catch(error) {
        console.error("❌ Error adding item to watchlist:", error);
        alert("Could not add item to watchlist. Please try again.");
    }

}