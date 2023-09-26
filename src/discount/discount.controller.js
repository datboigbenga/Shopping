const { ERROR_MESSAGE, SUCCESS_MESSAGE } = require("../../utils/messages")
const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, OK } = require("../../utils/statusCodes")
const validateDiscount = require("../../validations/discount.validation")
const discountService = require("./discount.service")

class DiscountController {
  createDiscount = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const validation = validateDiscount(req.body)

    if (!validation.success) return next(manageApplicationErrors({ message: validation.msg, statusCode: BAD_REQUEST}))

    const [error, response] = await manageAsyncOps(discountService.createDiscount(req.body))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response) return next(manageApplicationErrors({ message: ERROR_MESSAGE.CREATE_DISCOUNT, statusCode: BAD_REQUEST }))

    res.status(CREATED).json({
      message: SUCCESS_MESSAGE.DISCOUNT_CREATED,
      statusCode: CREATED,
    })
  }

  getAllDiscounts = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const [error, response] = await manageAsyncOps(discountService.getDiscountsByParams({}))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response.success) return next(manageApplicationErrors({ message: response.msg, statusCode: BAD_REQUEST }))

    res.status(OK).json({
      message: response.msg,
      statusCode: OK,
      data: response.discounts
    })
  }
  
  getAllDiscountsByType = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const [error, response] = await manageAsyncOps(discountService.getDiscountsByType(req.query))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response.success) return next(manageApplicationErrors({ message: response.msg, statusCode: BAD_REQUEST }))

    res.status(OK).json({
      message: response.msg,
      statusCode: OK,
      data: response.discounts
    })
  }
}

module.exports = new DiscountController()
