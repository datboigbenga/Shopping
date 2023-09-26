const invoiceService = require("./invoice.service")
const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, OK } = require("../../utils/statusCodes")
const { ERROR_MESSAGE, SUCCESS_MESSAGE } = require("../../utils/messages")

class InvoiceController {
  async createInvoice (req, res, next) {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const [error, response] = await manageAsyncOps(invoiceService.createInvoice(req.body))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response.success) return next(manageApplicationErrors({ message: response.msg, statusCode: BAD_REQUEST }))

    res.status(CREATED).json({
      message: SUCCESS_MESSAGE.INVOICE_CREATED,
      statusCode: CREATED,
      data: response.invoice
    })
  }

  getAllInvoices = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const [error, response] = await manageAsyncOps(invoiceService.getInvoicesByParams({}))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response.success) return next(manageApplicationErrors({ message: response.msg, statusCode: BAD_REQUEST }))

    res.status(OK).json({
      message: response.msg,
      statusCode: OK,
      data: response.invoices
    })
  }
}

module.exports = new InvoiceController()