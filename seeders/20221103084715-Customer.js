module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [
      {
      fullName: 'John',
      email: 'john@mail.com',
      userType: 'affiliate',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      fullName: 'Doe Mary',
      email: 'mary@mail.com',
      userType: 'affiliate',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      fullName: 'Elias Anuc',
      email: 'anuc@yahoo.com',
      userType: 'employee',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      fullName: 'Esther Kai',
      email: 'kai@mail.com',
      userType: 'employee',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      fullName: 'Harkeem Landos',
      email: 'lando@mail.com',
      userType: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};