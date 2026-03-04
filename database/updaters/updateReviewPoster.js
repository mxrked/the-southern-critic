/**
 * 
 *  This is used to update the review's poster
 * 
 */

import {doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { thesoutherncriticdb } from "../connectToDB";

export async function updateReviewPoster(itemStorageKey, newPosterUrl, setItems) {
    // If there is no newPosterUrl
    if (!newPosterUrl.trim()) {
        alert("Poster URL cannot be empty!");
        return;
    }

    try {
        const itemRef = doc(thesoutherncriticdb, "media", itemStorageKey);

        // Update only the poster field
        await updateDoc(itemRef, {
            objectPoster: newPosterUrl,
            updatedAt: serverTimestamp()
        });

        console.log("✅ Review poster updated successfully");

        // Update locally (frontend state)
        setItems(prevItems => 
            prevItems.map(item =>
                item.objectStorageKey === itemStorageKey
                ? { ...item, objectPoster: newPosterUrl}
                : item
            )
        )
    }  catch(error) {
        console.error("❌ Error updating review poster:", error)
    }
}