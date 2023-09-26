const setupRequestContext = require("../../utils/commons")
const customerRoute = require("../customers/customerRoute")
const discountRoute = require("../discount/discountRoute")
const invoiceRoute = require("../invoice/invoiceRoute")

const route = (app) => {
  const baseURL = "/api/v1"
  app.use(setupRequestContext)

  //all routes come below here
  app.use(`${baseURL}/customers`, customerRoute)
  app.use(`${baseURL}/discounts`, discountRoute)
  app.use(`${baseURL}/invoice`, invoiceRoute)
}

module.exports = route
