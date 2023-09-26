module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Discounts', [{
      type: 'familyDiscount',
      percent: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discounts', null, {});
  }
};