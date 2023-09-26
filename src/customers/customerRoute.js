const customerRoute = require("express").Router()
const CustomerController = require("./customer.controller")

const { 
  createCustomer,
  getAllCustomers,
  getAllCustomersByName,
  getCustomerById
} = CustomerController

customerRoute.route("/")
  .post(createCustomer)
  .get(getAllCustomers)

customerRoute.get('/name', getAllCustomersByName)
customerRoute.get('/:id', getCustomerById)

module.exports = customerRoute
