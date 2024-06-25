'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pseudo: Sequelize.TEXT,
      mail: Sequelize.TEXT,
      password: Sequelize.TEXT,
      elo: {
        type: Sequelize.INTEGER,
        defaultValue: 1200
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, {
      timestamps: true
    });
    await queryInterface.createTable('friends', {
      requestSenderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      requestReceiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pending: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, {
      timestamps: true
    });
    await queryInterface.createTable('chessBoards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      PGN: Sequelize.TEXT,
      result: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, {
      timestamps: true
    });
    await queryInterface.createTable('chessRooms', {
      roomId: {
        type: Sequelize.TEXT,
        primaryKey: true
      },
      onInviteOnly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      firstBoardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'chessBoards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      secondBoardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'chessBoards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      whitePiecesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      blackPiecesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, {
      timestamps: true
    });


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('chessRooms');
    await queryInterface.dropTable('chessBoards');
    await queryInterface.dropTable('friends');
    await queryInterface.dropTable('users');
  }
};
