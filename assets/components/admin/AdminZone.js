/**
 * 
 *  This is the Admin Zone
 * 
 */

import { AddItemToDB } from "./AddItemToDB"
import { DisplayItemsInDB } from "./DisplayItemsFromDB"

export const AdminZone = ({setReviewItems, reviewItems}) => {

    function adminZoneVisibilityStatus(status) {
        const OPEN_AZ_BTN = document.getElementById("openAdminZoneBtn");
        const CLOSE_AZ_BTN = document.getElementById("closeAdminZoneBtn");

        const REVIEW_ITEMS_LIST = document.getElementById("displayReviewItemsList");
        const ADD_REVIEW_ITEM_DIV = document.getElementById("admin_AddItemToDB");
        
        if (status === "OPEN") {
            OPEN_AZ_BTN.style.display = 'none';
            CLOSE_AZ_BTN.style.display = 'block';

            ADD_REVIEW_ITEM_DIV.style.display = 'block';
            REVIEW_ITEMS_LIST.style.display = 'block';
        } else {
            OPEN_AZ_BTN.style.display = 'block';
            CLOSE_AZ_BTN.style.display = 'none';

            ADD_REVIEW_ITEM_DIV.style.display = 'none';
            REVIEW_ITEMS_LIST.style.display = 'none';
        }
    }

    return (
        <div style={{padding: "30px", backgroundColor: "ghostwhite", border: "1px solid rgba(0,0,0,0.1)"}}>
        
            <h1 style={{fontSize: "30px", fontWeight: "bold", marginBottom: "20px"}}><strong>ADMIN ZONE:</strong></h1>
        
            
            <div style={{padding: "20px", marginBottom: "20px", backgroundColor: "grey"}}>
            
                <button id="openAdminZoneBtn" style={{backgroundColor: "white", padding: "10px", marginRight: "25px"}} onClick={(e) => {
                    adminZoneVisibilityStatus("OPEN")
                }}>Open Admin Zone</button>
                <button id="closeAdminZoneBtn" style={{display: "none", backgroundColor: "white", padding: "10px", marginRight: "25px"}} onClick={(e) => {
                    adminZoneVisibilityStatus("CLOSE")
                }}>Close Admin Zone</button>
            
            </div>

            <AddItemToDB setItems={setReviewItems}/>
            <DisplayItemsInDB reviewItems={reviewItems} setReviewItems={setReviewItems}/>
        
        </div>
    )
}