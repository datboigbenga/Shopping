const { Invoice } = require("../../models")
const { Op } = require("sequelize");

class InvoiceRepository {
  create = (invoicePayload) => Invoice.create(invoicePayload)

  fetchById = (id) => Invoice.findOne({ where: { id }, raw: true })

  fetch = async (params) => Invoice.findAll({ where: { ...params }, raw: true })

  fetchByParams = async (property, query) => Invoice.findAll({where: {[property]: { [Op.iLike] : `%${query}%` }}, raw: true })
}

module.exports = new InvoiceRepository()