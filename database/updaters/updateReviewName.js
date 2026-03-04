/**
 * 
 *  This is used to update a review's name
 * 
 */

import {doc, setDoc, updateDoc, serverTimestamp} from "firebase/firestore";

import { thesoutherncriticdb } from "../connectToDB";

export async function updateReviewName(itemStorageKey, newName, setItems) {
    if (!newName.trim()) {
        alert("Review name cannot be empty!");
        return;
    }

    try {
        const itemRef = doc(thesoutherncriticdb, "media", itemStorageKey);

        // Update only the name field
        await updateDoc(itemRef, {
            objectName: newName,
            updatedAt: serverTimestamp(),
        });

        console.log('✅ Review name updated successfully');

        // Update locally (frontend state)
        setItems(prevItems => 
            prevItems.map(item => 
                item.objectStorageKey === itemStorageKey
                ? {...item, objectName: newName} : item
            )
        );
    } catch(error) {
        console.error("❌ Error updating review name:", error);
    }
}
