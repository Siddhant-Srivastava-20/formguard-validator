function isStrongPassword(password) {
    if (typeof password !== "string") {
        return false;
    }
    if (password.length < 8) {
        return false;
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}
module.exports = { isStrongPassword };
