function ensureScheme(url) {
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
}

/*
This function check if url is valid according to:
1.  If the URL starts with "http://" or "https://", but this is optional.
2.  looks for a domain name, which consists of letters, digits, dots, or hyphens.
3.  It expects a top-level domain like ".com" or ".net", which must be between 2 to 6 characters long.
4.  Match additional parts of a URL, but these are optional.
*/

function isValidUrl(url) {
    var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(url);
}

module.exports = { ensureScheme, isValidUrl };