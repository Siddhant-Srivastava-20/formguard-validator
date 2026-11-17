# FormGuard Validator

**A lightweight, reusable JavaScript input validation library for Node.js applications.**

FormGuard Validator is an npm package designed to simplify input and form validation in JavaScript applications. It provides reusable validation functions for common inputs such as email addresses, phone numbers, URLs, usernames and passwords.

Instead of writing repetitive validation logic for every application, developers can integrate FormGuard and use its built-in validation methods.

## Features

- Email address validation
- Strong password validation
- Phone number validation
- URL validation
- Username validation
- Required field validation
- Numeric value validation
- Minimum and maximum length validation
- Multiple-field form validation
- Field-specific error messages
- Multiple errors for a single field
- Lightweight implementation using Node.js built-in functionality

## Installation

Install FormGuard Validator using npm:

```bash
npm install formguard-validator
```

## Requirements

- Node.js 18 or higher
- npm

## Usage

Import FormGuard functions into your Node.js application:

```javascript
const { isEmail } = require("formguard-validator");

console.log(isEmail("student@gmail.com"));
// true
```

### 1. Email Validation

Checks whether an email address follows a basic valid email format.

```javascript
const { isEmail } = require("formguard-validator");

console.log(isEmail("student@gmail.com"));
// true

console.log(isEmail("invalid-email"));
// false
```

### 2. Password Validation

Checks whether a password contains the required character combinations.

The password must contain:
- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character

```javascript
const { isStrongPassword } = require("formguard-validator");

console.log(isStrongPassword("Hello@123"));
// true

console.log(isStrongPassword("hello123"));
// false
```

### 3. Phone Number Validation

Checks whether a phone number follows the supported international numeric format.

```javascript
const { isPhone } = require("formguard-validator");

console.log(isPhone("9876543210"));
// true

console.log(isPhone("+919876543210"));
// true

console.log(isPhone("12345"));
// false
```

### 4. URL Validation

Validates HTTP and HTTPS URLs.

```javascript
const { isURL } = require("formguard-validator");

console.log(isURL("https://example.com"));
// true

console.log(isURL("ftp://example.com"));
// false
```

### 5. Username Validation

Checks username format.

Rules:
- Must start with a letter.
- Must contain between 3 and 20 characters.
- Can contain letters, numbers and underscores.

```javascript
const { isUsername } = require("formguard-validator");

console.log(isUsername("student_123"));
// true

console.log(isUsername("12student"));
// false
```

### 6. Required Field Validation

Checks whether a value has been provided.

```javascript
const { isRequired } = require("formguard-validator");

console.log(isRequired("Hello"));
// true

console.log(isRequired("   "));
// false

console.log(isRequired(null));
// false
```

### 7. Numeric Validation

Checks whether a value represents a finite number.

```javascript
const { isNumeric } = require("formguard-validator");

console.log(isNumeric("12345"));
// true

console.log(isNumeric("abc"));
// false
```

## Complete Form Validation

FormGuard also provides a form validation engine that allows developers to validate multiple fields using a single function.

### Example

```javascript
const { validateForm } = require("formguard-validator");

const userData = {
    name: "Rahul",
    email: "rahul@gmail.com",
    password: "Hello@123",
    phone: "9876543210"
};

const validationRules = {
    name: {
        required: true,
        minLength: 3,
        maxLength: 30
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
    }
};

const result = validateForm(userData, validationRules);

console.log(result);
```

### Successful Validation Output

```javascript
{
    isValid: true,
    errors: {}
}
```

### Failed Validation Example

```javascript
const userData = {
    name: "R",
    email: "invalid",
    password: "hello"
};

const validationRules = {
    name: {
        required: true,
        minLength: 3
    },

    email: {
        required: true,
        isEmail: true
    },

    password: {
        required: true,
        isStrongPassword: true
    }
};

console.log(validateForm(userData, validationRules));
```

Expected output:

```javascript
{
    isValid: false,
    errors: {
        name: [
            "name must contain at least 3 characters"
        ],
        email: [
            "email must be a valid email"
        ],
        password: [
            "password must be a strong password"
        ]
    }
}
```

## Available Validation Rules

| Rule | Description |
|---|---|
| required | Checks whether the field is provided |
| isEmail | Validates email format |
| isPhone | Validates phone number format |
| isURL | Validates HTTP/HTTPS URLs |
| isStrongPassword | Checks password strength |
| isNumeric | Checks numeric values |
| isUsername | Validates username format |
| minLength | Sets minimum character length |
| maxLength | Sets maximum character length |

## Project Structure

```text
formguard-validator/
│
├── src/
│   ├── index.js
│   ├── email.js
│   ├── password.js
│   ├── phone.js
│   ├── url.js
│   ├── text.js
│   └── form.js
│
├── test/
│   └── validation.test.js
│
├── examples/
│   └── demo.js
│
├── package.json
├── README.md
├── LICENSE
└── .gitignore
```

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Siddhant-Srivastava-20/formguard-validator.git
```

Navigate into the project:

```bash
cd formguard-validator
```

Run the package locally using Node.js.

## Running Tests

FormGuard uses the built-in Node.js test runner.

Execute:

```bash
npm test
```

## Technologies Used

- JavaScript
- Node.js
- npm
- Regular Expressions
- Git and GitHub
- Node.js built-in testing framework

## Design Approach

FormGuard follows a modular programming approach. Each validation category is implemented in a separate JavaScript module.

The form validation engine combines these individual modules to provide a reusable validation system.

This structure improves code organization, maintainability and reusability.

## Limitations

- Email validation checks format, not mailbox existence.
- Phone validation checks numeric format, not whether a number is active.
- URL validation checks supported URL structure, not website availability.
- Password validation checks character requirements, not password exposure or security against every possible attack.

## Future Improvements

- Custom validation rules
- Configurable validation messages
- Additional validation methods
- Improved automated test coverage
- More flexible validation options

## License

This project is licensed under the MIT License.

## Author

**Siddhant Srivastava**

GitHub: [Siddhant-Srivastava-20](https://github.com/Siddhant-Srivastava-20)

Project Repository: [FormGuard Validator](https://github.com/Siddhant-Srivastava-20/formguard-validator)
