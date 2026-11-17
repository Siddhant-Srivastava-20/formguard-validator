
const test = require("node:test");
const assert = require("node:assert/strict");

const {
    isEmail,
    isStrongPassword,
    isPhone,
    isURL,
    isRequired,
    isNumeric,
    isUsername,
    validateForm
} = require("../src");

test("Email validation", () => {
    assert.equal(isEmail("user@example.com"), true);
    assert.equal(isEmail("invalid-email"), false);
    assert.equal(isEmail(""), false);
    assert.equal(isEmail(123), false);
});

test("Password validation", () => {
    assert.equal(isStrongPassword("Strong@123"), true);
    assert.equal(isStrongPassword("weakpass"), false);
    assert.equal(isStrongPassword("Short@1"), false);
    assert.equal(isStrongPassword(12345678), false);
});

test("Phone validation", () => {
    assert.equal(isPhone("+919876543210"), true);
    assert.equal(isPhone("9876543210"), true);
    assert.equal(isPhone("123"), false);
    assert.equal(isPhone("phone"), false);
});

test("URL validation", () => {
    assert.equal(isURL("https://example.com"), true);
    assert.equal(isURL("http://example.com"), true);
    assert.equal(isURL("invalid-url"), false);
    assert.equal(isURL(""), false);
});

test("Required field validation", () => {
    assert.equal(isRequired("Siddhant"), true);
    assert.equal(isRequired(""), false);
    assert.equal(isRequired("   "), false);
    assert.equal(isRequired(null), false);
    assert.equal(isRequired(undefined), false);
});

test("Numeric validation", () => {
    assert.equal(isNumeric("123"), true);
    assert.equal(isNumeric(123), true);
    assert.equal(isNumeric("abc"), false);
    assert.equal(isNumeric(""), false);
});

test("Username validation", () => {
    assert.equal(isUsername("Siddhant123"), true);
    assert.equal(isUsername("ab"), false);
    assert.equal(isUsername("123user"), false);
    assert.equal(isUsername("user@123"), false);
});

test("Form validation", () => {
    const result = validateForm(
        {
            name: "Siddhant",
            email: "siddhant@example.com",
            age: 21
        },
        {
            name: { required: true, minLength: 3 },
            email: { required: true, isEmail: true },
            age: { required: true, isNumeric: true }
        }
    );

    assert.equal(result.isValid, true);
    assert.deepEqual(result.errors, {});
});

test("Missing required fields", () => {
    const result = validateForm(
        {},
        { name: { required: true } }
    );

    assert.equal(result.isValid, false);
    assert.deepEqual(result.errors, {
        name: ["name is required"]
    });
});

test("Invalid email in form", () => {
    const result = validateForm(
        { email: "invalid-email" },
        { email: { isEmail: true } }
    );

    assert.equal(result.isValid, false);
});

test("Custom validation rule", () => {
    const result = validateForm(
        { age: 16 },
        { age: { custom: value => value >= 18 } }
    );

    assert.equal(result.isValid, false);
    assert.deepEqual(result.errors, {
        age: ["age failed custom validation"]
    });
});

test("Minimum and maximum length rules", () => {
    const result = validateForm(
        { name: "Sid" },
        { name: { minLength: 5, maxLength: 10 } }
    );

    assert.equal(result.isValid, false);
    assert.deepEqual(result.errors, {
        name: ["name must contain at least 5 characters"]
    });
});

test("Invalid form data throws an error", () => {
    assert.throws(
        () => validateForm(null, {}),
        { message: "Form data must be an object" }
    );
});

test("Invalid field rules throw an error", () => {
    assert.throws(
        () => validateForm({ name: "Sid" }, { name: null }),
        { message: "name rules must be an object" }
    );
});


test("Negative minLength throws an error", () => {
    assert.throws(
        () => validateForm(
            { name: "Siddhant" },
            { name: { minLength: -2 } }
        ),
        { message: "name minLength must be a non-negative integer" }
    );
});

test("Non-numeric maxLength throws an error", () => {
    assert.throws(
        () => validateForm(
            { name: "Siddhant" },
            { name: { maxLength: "five" } }
        ),
        { message: "name maxLength must be a non-negative integer" }
    );
});

test("Invalid custom rule throws an error", () => {
    assert.throws(
        () => validateForm(
            { age: 21 },
            { age: { custom: "invalid" } }
        ),
        { message: "age custom rule must be a function" }
    );
});

