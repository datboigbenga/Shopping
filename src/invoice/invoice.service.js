const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")
const customerRepository = require("../customers/customer.repository")
const discountService = require("../discount/discount.service")
const invoiceRepository = require("./invoice.repository")

class InvoiceService {
  async createInvoice(invoicePayload) {
    const { userId, cost, product } = invoicePayload
    const user = await customerRepository.fetchById(userId)

    if (!user) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    let discount
    if (product !== 'groceries') {
      //determine discount type to apply
      discount = await this.discountType(user)
    }


    //fetch and deduct discount for user
    let discountValue
    let fetchDiscount
    if (discount) {
      fetchDiscount = await discountService.getDiscountsByType({ type: discount })

      if (!fetchDiscount.success) return { success: false, msg: ERROR_MESSAGE.APP_ERROR }

      const value = fetchDiscount.discounts[0].percent / 100
      discountValue = cost - ( value * cost )
    } else if (cost > 100) {
      discountValue = cost - ( Math.floor(cost / 100) * 5 )
    } else {
      discountValue = cost
    }

    const invoice = await invoiceRepository.create({ CustomerId: userId, initialCost: cost, finalCost: parseInt(discountValue), DiscountId: fetchDiscount.discounts[0].id, product })

    return { success: true, msg: SUCCESS_MESSAGE.INVOICE_CREATED, invoice }
  }

  async discountType (user) {
    //check if user is an employee or affiliate
    switch (user.userType) {
      case 'employee':
        return `employeeDiscount`
      case 'affiliate':
        return `affiliateDiscount`
      default:
        break;
    }
    


    //calculate discount for loyal customers
    const customerDuration = this.calculateYear(user.createdAt)

    if (customerDuration >= 2) return 'loyaltyDiscount'
  }


  calculateYear (year) {
    const currentDate = new Date()

    const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 30 * 12;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(year.getFullYear(), year.getMonth(), year.getDate());
    const utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_YEAR);
  }
}

module.exports = new InvoiceService()