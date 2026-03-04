/**
 * 
 *  This is used to update a review's type
 * 
 */

import {doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { thesoutherncriticdb } from "../connectToDB";

export async function updateReviewType(itemStorageKey, newType, setItems) {
    const normalizedType = newType.trim().toUpperCase();

    const allowedTypes = ["TVSHOW", "MOVIE"];

    if (!allowedTypes.includes(normalizedType)) {
        alert("Type must be either 'TVSHOW' or 'MOVIE'");
        return;
    }

    try {
        const itemRef = doc(thesoutherncriticdb, "media", itemStorageKey);

        await updateDoc(itemRef, {
            objectType: normalizedType,
            updatedAt: serverTimestamp(),
        });

        console.log("✅ Review type updated successfully");

        // Update frontend state
        setItems(prevItems => 
            prevItems.map(item =>
                item.objectStorageKey === itemStorageKey
                ? { ...item, objectType: normalizedType}
                : item
            )
        );
    } catch (error) {
        console.error("❌ Error updating review type:", error);
    }
}