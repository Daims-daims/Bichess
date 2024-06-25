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
    await queryInterface.bulkInsert('chessRooms', [{
      roomId: 'AAAAAAAA',
      whitePiecesId: 1,
      blackPiecesId: 2,
      firstBoardId: 1,
      secondBoardId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      roomId: 'BBBBBBB',
      whitePiecesId: 2,
      blackPiecesId: 3,
      firstBoardId: 3,
      secondBoardId: 4,
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
