function isPhone(phone) {
    if (typeof phone !== "string" && typeof phone !== "number") {
        return false;
    }
    phone = String(phone).trim();
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneRegex.test(phone);
}
module.exports = { isPhone };
