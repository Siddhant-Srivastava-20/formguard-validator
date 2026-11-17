
const { isEmail } = require("./email");
const { isStrongPassword } = require("./password");
const { isPhone } = require("./phone");
const { isURL } = require("./url");
const { isRequired, isNumeric, isUsername } = require("./text");

function validateForm(data, rules) {
    const errors = {};
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new TypeError("Form data must be an object");
    }
    if (!rules || typeof rules !== "object" || Array.isArray(rules)) {
        throw new TypeError("Validation rules must be an object");
    }
    for (const field of Object.keys(rules)) {
        const value = data[field];
        const fieldRules = rules[field];
        const fieldErrors = [];
        if (!fieldRules || typeof fieldRules !== "object" || Array.isArray(fieldRules)) {
            throw new TypeError(`${field} rules must be an object`);
        }
        if (
            Object.prototype.hasOwnProperty.call(fieldRules, "custom") &&
            typeof fieldRules.custom !== "function"
        ) {
            throw new TypeError(`${field} custom rule must be a function`);
        }
        for (const key of ["minLength", "maxLength"]) {
            if (
                fieldRules[key] !== undefined &&
                (!Number.isInteger(fieldRules[key]) || fieldRules[key] < 0)
            ) {
                throw new TypeError(`${field} ${key} must be a non-negative integer`);
            }
        }
        const isEmpty = value === undefined || value === null || value === "";
        if (fieldRules.required && !isRequired(value)) {
            fieldErrors.push(`${field} is required`);
        } else if (!isEmpty) {
            if (fieldRules.isEmail && !isEmail(value)) {
                fieldErrors.push(`${field} must be a valid email`);
            }
            if (fieldRules.isPhone && !isPhone(value)) {
                fieldErrors.push(`${field} must be a valid phone number`);
            }
            if (fieldRules.isURL && !isURL(value)) {
                fieldErrors.push(`${field} must be a valid URL`);
            }
            if (fieldRules.isStrongPassword && !isStrongPassword(value)) {
                fieldErrors.push(`${field} must be a strong password`);
            }
            if (fieldRules.isNumeric && !isNumeric(value)) {
                fieldErrors.push(`${field} must be numeric`);
            }
            if (fieldRules.isUsername && !isUsername(value)) {
                fieldErrors.push(`${field} must be a valid username`);
            }
            if (fieldRules.custom && !fieldRules.custom(value)) {
                fieldErrors.push(`${field} failed custom validation`);
            }
            if (
                fieldRules.minLength !== undefined &&
                String(value).length < fieldRules.minLength
            ) {
                fieldErrors.push(`${field} must contain at least ${fieldRules.minLength} characters`);
            }
            if (
                fieldRules.maxLength !== undefined &&
                String(value).length > fieldRules.maxLength
            ) {
                fieldErrors.push(`${field} must not exceed ${fieldRules.maxLength} characters`);
            }
        }
        if (fieldErrors.length > 0) {
            errors[field] = fieldErrors;
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
module.exports = { validateForm };
