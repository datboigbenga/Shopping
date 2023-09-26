const { Discount } = require("../../models")
const { Op } = require("sequelize");

class DiscountRepository {
  create = (discountPayload) => Discount.create(discountPayload)

  fetchById = (id) => Discount.findOne({ where: { id }, raw: true })

  fetch = async (params) => Discount.findAll({ where: { ...params }, raw: true })

  fetchByParams = async (property, query) => Discount.findAll({where: {[property]: { [Op.iLike] : `%${query}%` }}, raw: true })
}

module.exports = new DiscountRepository()
