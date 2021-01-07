const validateCommentInput = data => {

    // Define Errors
    let errors = {}

    // Check if Comment Text Exists
    if (!data.text) {
        errors.text = "Text is required";
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }

}

module.exports = validateCommentInput;