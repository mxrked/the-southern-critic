/**
 * 
 *  This is used to update the review's text
 * 
 */

import {doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { thesoutherncriticdb } from "../connectToDB";

export async function updateReviewText(itemStorageKey, newReviewText, setItems) {
    // If there is no new review text
    if (!newReviewText.trim()) {
        alert("Review text cannot be empty!");
        return;
    }

    try {
        const itemRef = doc(thesoutherncriticdb, "media", itemStorageKey);

        // Update only the review text
        await updateDoc(itemRef, {
            objectReview: newReviewText,
            updatedAt: serverTimestamp(),
        });

        console.log("✅ Review text updated successfully");

        // Update locally (frontend state)
        setItems(prevItems => 
            prevItems.map(item =>
                item.objectStorageKey === itemStorageKey
                ? { ...item, objectReview: newReviewText}
                : item
            )
        )
    } catch(error) {
        console.error("❌ Error updating review text:", error);
    }
}