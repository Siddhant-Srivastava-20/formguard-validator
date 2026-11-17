function isURL(url) {
    if (typeof url !== "string") {
        return false;
    }
    url = url.trim();
    if (url.length === 0) {
        return false;
    }
    try {
        const parsedURL = new URL(url);
        return (
            (parsedURL.protocol === "http:" || parsedURL.protocol === "https:") &&
            parsedURL.hostname.includes(".")
        );
    } catch {
        return false;
    }
}
module.exports = { isURL };