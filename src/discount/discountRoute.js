const discountRoute = require("express").Router()
const DiscountController = require("./discount.controller")

const {
  createDiscount,
  getAllDiscounts,
  getAllDiscountsByType
} = DiscountController

discountRoute.route("/")
  .post(createDiscount)
  .get(getAllDiscounts)

discountRoute.get('/type', getAllDiscountsByType)

module.exports = discountRoute