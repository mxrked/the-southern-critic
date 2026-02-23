import {collection, getDocs, QuerySnapshot} from "firebase/firestore";
import { thesoutherncriticdb } from "../connectToDB";

export async function getItemsFromDB(e) {

    try {

        // Grabbing the collection
        const itemsCollection = collection(thesoutherncriticdb, "media");

        // Getting the items in the collection
        const collectionSnapshot = await getDocs(itemsCollection);

        // Mapping out the items in the collection
        const items = collectionSnapshot.docs.map(doc => {
            const data = doc.data();

            // Convert Firestore Timestamp to ISO string
            if (data.createdAt && data.createdAt.toDate) {
                data.createdAt = data.createdAt.toDate().toISOString();
            }

            return {
                id: doc.id,
                ...data,
            };
    });


        return items;
    } catch(error) {
        console.log("Error fetching documents:", error);
        return [];
    }

}