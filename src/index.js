const { isEmail } = require("./email");
const { isStrongPassword } = require("./password");
const { isPhone } = require("./phone");
const { isURL } = require("./url");
const { isRequired, isNumeric, isUsername } = require("./text");
const { validateForm } = require("./form");

module.exports = {
    isEmail,
    isStrongPassword,
    isPhone,
    isURL,
    isRequired,
    isNumeric,
    isUsername,
    validateForm
};