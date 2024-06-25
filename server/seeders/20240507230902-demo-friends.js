'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('friends', [{
      requestSenderId: 1,
      requestReceiverId: 2,
      pending: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      requestSenderId: 1,
      requestReceiverId: 3,
      pending: false,
      accepted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      requestSenderId: 2,
      requestReceiverId: 3,
      pending: false,
      accepted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      requestSenderId: 4,
      requestReceiverId: 1,
      pending: true,
      accepted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      requestSenderId: 3,
      requestReceiverId: 4,
      pending: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('friends', null, {})
  }
};
