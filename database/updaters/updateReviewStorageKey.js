/**
 * 
 *  This is used to update a review's storage key
 * 
 */

import {doc, setDoc, updateDoc, serverTimestamp} from "firebase/firestore";

import { thesoutherncriticdb } from "../connectToDB";

export async function updateReviewStorageKey(itemStorageKey, newStorageKey, setItems) {
    if (!newStorageKey.trim()) {
        alert("Review storage key cannot be empty!");
        return;
    }

    try {
        const itemRef = doc(thesoutherncriticdb, "media", itemStorageKey);

        // Update only the route storage
        await updateDoc(itemRef, {
            objectStorageKey: newStorageKey,
            updatedAt: serverTimestamp(),
        });

        console.log('✅ Review storage key updated successfully');

        // Update locally (frontend state)
        setItems(prevItems => 
            prevItems.map(item => 
                item.objectStorageKey === itemStorageKey
                ? {...item, objectStorageKey: newStorageKey} : item
            )
        );
    } catch(error) {
        console.error("❌ Error updating review storage key:", error);
    }
}
