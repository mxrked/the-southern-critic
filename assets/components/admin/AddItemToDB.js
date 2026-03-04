import { addItemToDB } from "@/database/setters/addItemToDB"
import { getItemsFromDB } from "@/database/getters/getItemsFromDB";


export const AddItemToDB = ({setItems}) => {

    return (
        <div id="admin_AddItemToDB"  style={{display: "none"}}>

            <form id="addReviewItemForm" onSubmit={(e) => {
                addItemToDB(setItems, e);
            }}>

                <label>

                    Item Type:

                    <select id="itemType">
                        <option value="MOVIE">Movie</option>
                        <option value="TVSHOW">TV Show</option>
                    </select>

                </label>

                <br/>

                <label>

                    Item Name:

                    <input type="text" id="itemName" required/>

                </label>

                <br/>

                <label>

                    Item Poster:

                    <input type="file" id="itemPoster" accept="image/*" required/>

                </label>

                <br/>

                <label>

                    Item Rating:

                    <input type="number" max={5} min={1} id="itemRating" required/>

                </label>

                <br/>

                <label>

                    Item Review:

                    <textarea id="itemReview" required/>

                </label>

                <br/>

                <label>

                    Item Route:

                    <input type="text" id="itemRoute" required/>

                </label>

                <br/>

                <label>

                    Item Storage Key:

                    <input type="text" id="itemStorageKey" required/>

                </label>

                <button type="submit">Add Item</button>

            </form>

        </div>
    )

}