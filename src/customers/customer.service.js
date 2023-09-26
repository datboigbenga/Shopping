const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")
const customerRepository = require("./customer.repository")

class CustomerService {
  async createCustomer(payload) {
    return customerRepository.create(payload)
  }

  async getCustomersByParams(queryPayload) {
    const customers = await customerRepository.fetch({ ...queryPayload })

    if (customers.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_CUSTOMER, customers }
  }
  
  async getCustomersByName(query) {
    const customers = await customerRepository.fetchByParams(Object.keys(query)[0], Object.values(query)[0])

    if (customers.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_CUSTOMER, customers }
  }

  async getCustomerById(param) {
    const customer = await customerRepository.fetchById(param.id)

    if (!customer) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_CUSTOMER, customer }
  }
}

module.exports = new CustomerService()
