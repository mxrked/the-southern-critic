/**
 * 
 *  This is used to clear input fields
 * 
 */

export default function ClearInputFields(fields) {
    document.querySelectorAll(fields).forEach((input) => {
            if (input.value.length > 0) {
                input.value = "";
            }
        })
}