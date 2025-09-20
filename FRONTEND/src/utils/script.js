// calculates the height of the an element
const getElementHeight = (id) => {
    return document.getElementById(id).offsetHeight;
}
export default getElementHeight

export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}