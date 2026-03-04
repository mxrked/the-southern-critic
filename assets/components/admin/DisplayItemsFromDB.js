/**
 * 
 *  This is used to display the items in the Database
 * 
 */


import { removeItemFromDB } from "@/database/removers/removeItemFromDB";
import { updateReviewName } from "@/database/updaters/updateReviewName";
import { updateReviewPoster } from "@/database/updaters/updateReviewPoster";
import { updateReviewText } from "@/database/updaters/updateReviewText";
import { updateReviewRating } from "@/database/updaters/updateReviewRating";
import { updateReviewType } from "@/database/updaters/updateReviewType";
import { updateReviewRoute } from "@/database/updaters/updateReviewRoute";
import { updateReviewStorageKey } from "@/database/updaters/updateReviewStorageKey";

export const DisplayItemsInDB = ({setReviewItems, reviewItems}) => {
    return (
        <ul id="displayReviewItemsList" style={{display: "none", padding: "20px", marginTop: "30px", backgroundColor: "rgba(0,0,0,0.1)"}}>
        
                      {reviewItems.map(item => (
                        <li key={item.objectStorageKey} style={{marginTop: "20px", marginBottom: "20px",borderTop: "1px solid black", borderBottom: "1px solid black", paddingTop: "30px", paddingBottom: "30px"}} >
                          Name: {item.objectName} <br/> 
                          Poster: <img src={item.objectPoster} style={{maxWidth: "100px"}}/> <br/> 
                          Route: <a href={item.objectRoute}>Link</a>
                          <br/><br/>
                          Type: {item.objectType}
                          <br/><br/>
                          Review: <p>" {item.objectReview} "</p>
                          <br/>
                          Rating: <p><strong>{item.objectRating}</strong> Stars</p>
                          <br/> <br/>
                          Storage Key: <p><strong>{item.objectStorageKey}</strong></p>
                          <br/> <br/>
                          
                          <span style={{fontWeight: "bold", display: "block", marginBottom: "10px", paddingTop: "30px"}}>EDIT PROPERTIES</span>
                          
                          <div style={{display: 'flex', justifyContent: "space-between", maxWidth: "900px", marginTop: "25px"}}>
                            <button onClick={() => {
                            const newName = prompt("Enter new review name:", item.objectName);
                            if (newName !== null) {
                              updateReviewName(item.objectStorageKey, newName, setReviewItems);
                            }
                          }} style={{backgroundColor: "lightgrey", color: "black", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Edit Name</button>
                          <br/> <br/>
                          <button onClick={() => {
                            const newPoster = prompt("Enter new poster image URL:", item.objectPoster);
                            if (newPoster) {
                              updateReviewPoster(item.objectStorageKey, newPoster, setReviewItems);
                            }
                          }} style={{backgroundColor: "lightgrey", color: "black", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Edit Poster</button>
                          <br/> <br/>
                          <button onClick={() => {
                            const newText = prompt(
                              "Edit review text:",
                              item.objectReview // This will pre-fill the text prompt
                            );
        
                            if (newText !== null) {
                              updateReviewText(item.objectStorageKey, newText, setReviewItems);
                            }
                          }} style={{backgroundColor: "lightgrey", color: "black", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Edit Review Text</button>
                          <br/> <br/>
                          <button onClick={() => {
                            const newRoute = prompt("Enter new review route:", item.objectRoute);
                            if (newRoute !== null) {
                              updateReviewRoute(item.objectStorageKey, newRoute, setReviewItems);
                            }
                          }} style={{backgroundColor: "lightgrey", color: "black", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Edit Route</button>
                          <br/> <br/>
                          <button onClick={() => {
                            const newRating = prompt(
                              "Edit rating (0-5):",
                              item.objectRating
                            );
        
                            if (newRating !== null) {
                              updateReviewRating(item.objectStorageKey, newRating, setReviewItems);
                            }
                          }} style={{backgroundColor: "lightgrey", color: "black", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Edit Rating</button>
                          <br/> <br/>
                          <button onClick={() => {
                            const newType = prompt(
                              "Enter type ('TVSHOW' or 'MOVIE'):",
                              item.objectType
                            )
        
                            if (newType !== null) {
                              updateReviewType(item.objectStorageKey, newType, setReviewItems);
                            }
                          }} style={{backgroundColor: "lightgrey", color: "black", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Edit Type</button>
                          <br/> <br/>
                          <button onClick={() => {
                            const newStorageKey = prompt(
                              "Enter new storage key:",
                              item.objectStorageKey
                            )
        
                            if (newStorageKey !== null) {
                              updateReviewStorageKey(item.objectStorageKey, newStorageKey, setReviewItems);
                            }
                          }} style={{backgroundColor: "lightgrey", color: "black", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Edit Storage Key</button>
                          <br/> <br/>
                          <button onClick={() => {
                            const confirmed = window.confirm("Are you sure you want to delete this item?");
                            if (confirmed) {
                              removeItemFromDB(item.objectStorageKey, setReviewItems);
                            }
                          }} style={{backgroundColor: "darkred", color: "white", padding: "10px", border: "1px solid grey", borderRadius: "5px"}}>Remove Item</button>
                          </div>
        
                          </li>
                      ))}
        
                    </ul>
    )
}