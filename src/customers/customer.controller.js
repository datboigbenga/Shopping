const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")
const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, OK } = require("../../utils/statusCodes")
const validateCustomerSignUp = require("../../validations/create_user.validation")
const customerService = require("./customer.service")

class CustomerController {
  createCustomer = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const validation = validateCustomerSignUp(req.body)

    if (!validation.success) return next(manageApplicationErrors({ message: validation.msg, statusCode: BAD_REQUEST}))

    const [error, response] = await manageAsyncOps(customerService.createCustomer(req.body))

    if (error?.name === 'SequelizeUniqueConstraintError') return next(manageApplicationErrors({ message: ERROR_MESSAGE.DUPLICATE_USER, statusCode: BAD_REQUEST }))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response) return next(manageApplicationErrors({ message: ERROR_MESSAGE.CREATE_USER, statusCode: BAD_REQUEST }))

    res.status(CREATED).json({
      message: SUCCESS_MESSAGE.USER_CREATED,
      statusCode: CREATED,
    })
  }

  getAllCustomers = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const [error, response] = await manageAsyncOps(customerService.getCustomersByParams({}))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response.success) return next(manageApplicationErrors({ message: response.msg, statusCode: BAD_REQUEST }))

    res.status(OK).json({
      message: response.msg,
      statusCode: OK,
      data: response.customers
    })
  }
  
  getAllCustomersByName = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const [error, response] = await manageAsyncOps(customerService.getCustomersByName(req.query))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response.success) return next(manageApplicationErrors({ message: response.msg, statusCode: BAD_REQUEST }))

    res.status(OK).json({
      message: response.msg,
      statusCode: OK,
      data: response.customers
    })
  }

  getCustomerById = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const [error, response] = await manageAsyncOps(customerService.getCustomerById(req.params))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response.success) return next(manageApplicationErrors({ message: response.msg, statusCode: BAD_REQUEST }))

    res.status(OK).json({
      message: response.msg,
      statusCode: OK,
      data: response.customer
    })
  }
}

module.exports = new CustomerController()
