const validateTicketInput = data => {

    // Define Errors
    let errors = {}

    // Check if text exists
    if (!data.text) {
        errors.text = "Text is required";
    }

    // Check if status exists
    if (!data.status) {
        errors.status = "Status is required";
    }

    // Check if dev exists
    if (!data.dev) {
        errors.dev = "A Developer is required";
    }

    // Check if priority exists
    if (!data.priority) {
        errors.priority = "A priority level is required"
    }
    
    return {
        errors,
        isValid: !Object.keys(errors).length
    }

}

module.exports = validateTicketInput;