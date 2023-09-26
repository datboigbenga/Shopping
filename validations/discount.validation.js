const Joi = require("joi")

const validateDiscount = (requestData, next) => {
    const schema = Joi.object().keys({
        type: Joi.string().required().min(1),
        percent: Joi.number().required().min(1),
    })

    const isValidateResult = schema.validate(requestData)
    if (isValidateResult?.error) {
        return { success: false, msg: isValidateResult.error?.message }
    } else {
      return { success: true }
    }
}

module.exports = validateDiscount