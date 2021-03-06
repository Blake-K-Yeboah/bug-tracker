const validateProjectInput = data => {

    // Define Errors
    let errors = {}

    // Check Project Name Exists
    if (!data.name) {
        errors.name = "Title is requied";
    }

    // Check Project Description Exists
    if (!data.description) {
        errors.description = "Description Requires";
    }

    // Check Lengths of both name and description
    if (data.name && data.name.length > 24) {
        errors.name = "Title exceeds 24 character limit";
    }
    
    if (data.description && data.description.length > 75) {
        errors.description = "Description exceeds 75 character limit";
    }

    if (!data.owner) {
        errors.owner = "A value for owner must be passed through"
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}

module.exports = validateProjectInput;