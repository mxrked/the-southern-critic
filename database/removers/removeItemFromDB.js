/**
 * 
 *  This is used to remove items from the DB
 * 
 */

import {doc, deleteDoc} from "firebase/firestore";
import { thesoutherncriticdb } from "../connectToDB";

export async function removeItemFromDB(objectStorageKey, setItems) {
    try {
        // Delete from Firestore
        await deleteDoc(doc(thesoutherncriticdb, "media", objectStorageKey));

        console.log("🗑️ Item deleted successfully");

        setItems(prevItems => prevItems.filter(item => item.objectStorageKey !== objectStorageKey));
    } catch (error) {
        console.error("❌ Error deleting item:", error);
    }
}