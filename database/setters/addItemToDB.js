import {doc, setDoc, serverTimestamp} from "firebase/firestore";
import { thesoutherncriticdb} from "../connectToDB";


export async function addItemToDB(setItems, e) {

    e.preventDefault();

    const addItemForm = document.querySelector("#admin_AddItemToDB form");

    // Form objects
    const itemType = addItemForm.querySelector("#itemType").value;
    const itemName = addItemForm.querySelector("#itemName").value;
    const itemPoster = addItemForm.querySelector("#itemPoster").files[0];
    const itemRating = addItemForm.querySelector("#itemRating").value;
    const itemReview = addItemForm.querySelector("#itemReview").value;
    const itemRoute = addItemForm.querySelector("#itemRoute").value;
    const itemStorageKey = addItemForm.querySelector("#itemStorageKey").value;

    // Checking if the user selects a poster
    if (!itemPoster) {
        alert("Please select a poster image!");
        return;
    }


    // Getting the exact poster name and type
    const posterFolder = itemType === "MOVIE" ? "movies" : "tv";
    const posterPath = `medias/imgs/posters/${posterFolder}/${itemPoster.name}`;

    const itemFinalRoute = "/reviews/" + itemRoute;


    try {
        // Adding the item to the database
        await setDoc(doc(thesoutherncriticdb, "media", itemStorageKey), {
            objectType: itemType,
            objectName: itemName,
            objectRoute: itemFinalRoute,
            objectRating: itemRating,
            objectReview: itemReview,
            objectStorageKey: itemStorageKey,
            objectPoster: posterPath,
            createdAt: serverTimestamp(),
        });

        console.log("✅ Item added successfully");

        // Append locally
        const newItem = {
            objectType: itemType,
            objectName: itemName,
            objectRoute: itemFinalRoute,
            objectRating: itemRating,
            objectReview: itemReview,
            objectStorageKey: itemStorageKey,
            objectPoster: posterPath,
            createdAt: new Date().toISOString(),
        }

        // Updating the items on the frontend
        setItems(prevItems => [newItem, ...prevItems]);

        addItemForm.reset();
    } catch(error) {
        console.error("❌ Error adding item:", error);
    }

}