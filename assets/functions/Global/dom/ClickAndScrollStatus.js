/**
 * 
 *  This is the Click And Scroll Status Function
 * 
 */

export default function ClickAndScrollStatus(status) {

    if (status === "Allow") {

        document.body.style.overflowY = "auto";
        document.body.style.pointerEvents = 'auto';

    } else {
        
        document.body.style.overflowY = "hidden";
        document.body.style.pointerEvents = 'none';

    }

}