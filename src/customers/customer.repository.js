const { Customer } = require("../../models")
const { Op } = require("sequelize");

class CustomerRepository {
  create = (customerPayload) => Customer.create(customerPayload)

  fetchById = (id) => Customer.findOne({ where: { id }, raw: true })

  fetch = async (params) => Customer.findAll({ where: { ...params }, raw: true })

  fetchByParams = async (property, query) => Customer.findAll({where: {[property]: { [Op.iLike] : `%${query}%` }}, raw: true })
  
  
}

module.exports = new CustomerRepository()
