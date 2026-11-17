
function isRequired(value) {
    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === "string") {
        return value.trim().length > 0;
    }

    return true;
}

function isNumeric(value) {
    if (typeof value !== "string" && typeof value !== "number") {
        return false;
    }

    if (String(value).trim() === "") {
        return false;
    }

    return Number.isFinite(Number(value));
}

function isUsername(username) {
    if (typeof username !== "string") {
        return false;
    }

    return /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(username);
}

module.exports = {
    isRequired,
    isNumeric,
    isUsername
};
