const Joi = require("joi")

const validateCustomerSignUp = (requestData) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        fullName: Joi.string().required().min(1),
        userTupe: Joi.string().required().min(1),
    })

    const isValidateResult = schema.validate(requestData)
    if (isValidateResult?.error) {
        return { success: false, msg: isValidateResult.error?.message }
    } else {
      return { success: true }
    }
}

module.exports = validateCustomerSignUp