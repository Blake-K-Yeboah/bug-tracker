const validateRegisterInput = data => {

    // Define Errors
    let errors = {}

    // Check Name Exists
    if (!data.name) {
        errors.name = "Name field is required"
    } else {
        // Check Name contains punctuation
        const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

        for (let i = 0; i < punctuation.length; i++) {
            if (data.name.includes(punctuation[i])) {
                errors.name = "Name field contains punctuation"
            }
        };
    }

    // Check Name is below character limit
    if (data.name && data.name.length > 24) {
        errors.name = "Name exceeded 24 character limit"
    }

    // Check Email Is valid
    if (!data.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        errors.email = "Email is not valid"
    }

    // Check Password exists
    if (!data.password) {
        errors.password = "Password field is required"
    }

    // Check password equals repeatedPassword
    if (data.password && data.password !== data.repeatedPassword) {
        errors.repeatedPassword = "Password dont match"
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}

module.exports = validateRegisterInput;