/**
 * 
 *  This is to allow any elements to be clickable if the ClickAndScrollStatus is disallow
 * 
 */


function allowClickOnDis(element) {
    element.style.pointerEvents = "auto";
}

function allowScrollOnDis(element) {
    element.style.overflowY = "auto";
}

export {allowClickOnDis, allowScrollOnDis}