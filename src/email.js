function isEmail(email) {
    if (typeof email !== "string") {
        return false;
    }
    email = email.trim();
    if (email.length === 0) {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
module.exports = { isEmail };
