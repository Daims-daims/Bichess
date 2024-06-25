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
    await queryInterface.bulkInsert('chessBoards', [{
      PGN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      result: 'draw',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      PGN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      result: 'white',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      PGN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      result: 'black',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      PGN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      result: 'black',
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
    await queryInterface.bulkDelete('chessBoards', null, {});
  }
};
