module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Invoices', [
      {
      "initialCost": 2345,
      "finalCost": 2145,
      "CustomerId": 13,
      "Discountid": 2,
      "product": "electronics",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      "initialCost": 5000,
      "finalCost": 4800,
      "CustomerId": 16,
      "Discountid": 2,
      "product": "Snacks",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      "initialCost": 3200,
      "finalCost": 3000,
      "CustomerId": 1,
      "Discountid": 3,
      "product": "gadgets",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Invoices', null, {});
  }
};