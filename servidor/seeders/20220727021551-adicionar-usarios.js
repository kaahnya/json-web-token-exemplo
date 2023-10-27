'use strict';
const crypto = require('../crypto');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { nome: 'picolo', senha: crypto.encrypt('123')}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
