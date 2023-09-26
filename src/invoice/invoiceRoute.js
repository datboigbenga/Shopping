const invoiceRoute = require("express").Router()
const InvoiceController = require("./invoice.controller")

const {
  createInvoice,
  getAllInvoices,
} = InvoiceController

invoiceRoute.post("/", createInvoice)
invoiceRoute.get("/", getAllInvoices)

module.exports = invoiceRoute