'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
         pseudo: 'oui',
         mail:"oui@oui.oui",
         password: 'oui',
         createdAt: new Date(),
         updatedAt: new Date(),
       },{
        pseudo: 'non',
         mail:"non@non.non",
         password: 'non',
         createdAt: new Date(),
         updatedAt: new Date(),
      },{
        pseudo: 'okay',
         mail:"okay@okay.okay",
         password: 'okay',
         createdAt: new Date(),
         updatedAt: new Date(),
      },{
        pseudo: 'ok',
         mail:"ok@ok.ok",
         password: 'ok',
         createdAt: new Date(),
         updatedAt: new Date(),
      }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('users', null, {})
  }
};
