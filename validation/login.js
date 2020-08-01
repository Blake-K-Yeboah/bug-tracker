const validateLoginInput = data => {

    // Define Errors
    let errors = {};

    // Check properties
    if (!data.email) {
        errors.email = "Email field is required";
    }

    if (!data.password) {
        errors.password = "Password field is required";
    }

    // Return errors and isValid Boolean
    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}

module.exports = validateLoginInput;