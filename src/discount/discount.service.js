const discountRepository = require("./discount.repository")
const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")

class DiscountService {
  createDiscount (discountPayload) {
    return discountRepository.create(discountPayload)
  }

  async getDiscountsByParams(queryPayload) {
    const discounts = await discountRepository.fetch({ ...queryPayload })

    if (discounts.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_DISCOUNT }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_DISCOUNT, discounts }
  }
  
  async getDiscountsByType(query) {
    const discounts = await discountRepository.fetchByParams(Object.keys(query)[0], Object.values(query)[0])

    if (discounts.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_DISCOUNT }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_DISCOUNT, discounts }
  }
  
}

module.exports = new DiscountService()