/**
 * 
 *  This is the CheckElementOnScreen function
 * 
 */

export default function CheckElementOnScreen(element) {
     if (!element) return false;

        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0
        );
}