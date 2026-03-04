/**
 * 
 *  This is used to update a reviews rating
 * 
 */

import {doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { thesoutherncriticdb } from "../connectToDB";

export async function updateReviewRating(itemStorageKey, newRating, setItems) {
    const parsedRating = Number(newRating);

    // Validation
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
        alert("Rating must be a number between 0 and 5.");
        return;
    }

    try {
        const itemRef = doc(thesoutherncriticdb, "media", itemStorageKey);

        await updateDoc(itemRef, {
            objectRating: parsedRating,
            updatedAt: serverTimestamp(),
        });

        console.log("✅ Review rating updated successfully");

        // Update frontend state
        setItems(prevItems =>
            prevItems.map(item =>
                item.objectStorageKey === itemStorageKey
                ? { ...item, objectRating: parsedRating}
                : item
            )
        );
        
    } catch (error) {
        console.error("❌ Error updating review rating:", error);
    }
}