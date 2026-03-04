/**
 * 
 *  This is used to update a review's route
 * 
 */

import {doc, setDoc, updateDoc, serverTimestamp} from "firebase/firestore";

import { thesoutherncriticdb } from "../connectToDB";

export async function updateReviewRoute(itemStorageKey, newRoute, setItems) {
    if (!newRoute.trim()) {
        alert("Review route cannot be empty!");
        return;
    }

    try {
        const itemRef = doc(thesoutherncriticdb, "media", itemStorageKey);

        // Update only the route field
        await updateDoc(itemRef, {
            objectRoute: newRoute,
            updatedAt: serverTimestamp(),
        });

        console.log('✅ Review route updated successfully');

        // Update locally (frontend state)
        setItems(prevItems => 
            prevItems.map(item => 
                item.objectStorageKey === itemStorageKey
                ? {...item, objectRoute: newRoute} : item
            )
        );
    } catch(error) {
        console.error("❌ Error updating review route:", error);
    }
}
