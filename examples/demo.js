
const FormGuard = require("../src");

const user = {
    name: "Siddhant",
    username: "siddhant_20",
    email: "siddhant@example.com",
    password: "Strong@123",
    phone: "+919876543210",
    age: 21
};

const rules = {
    name: {
        required: true,
        minLength: 3,
        maxLength: 30
    },
    username: {
        required: true,
        isUsername: true
    },
    email: {
        required: true,
        isEmail: true
    },
    password: {
        required: true,
        isStrongPassword: true
    },
    phone: {
        required: true,
        isPhone: true
    },
    age: {
        required: true,
        isNumeric: true,
        custom: value => Number(value) >= 18
    }
};

const result = FormGuard.validateForm(user, rules);

if (result.isValid) {
    console.log("Form submitted successfully!");
} else {
    console.log("Form validation failed:");
    console.log(result.errors);
}
