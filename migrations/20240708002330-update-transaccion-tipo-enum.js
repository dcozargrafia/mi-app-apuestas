'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Transaccions_tipo" RENAME TO "enum_Transaccions_tipo_old";
      CREATE TYPE "enum_Transaccions_tipo" AS ENUM('Depósito', 'Retiro');
      ALTER TABLE "Transaccions" ALTER COLUMN "tipo" TYPE "enum_Transaccions_tipo" USING ("tipo"::text::"enum_Transaccions_tipo");
      DROP TYPE "enum_Transaccions_tipo_old";
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Transaccions_tipo" RENAME TO "enum_Transaccions_tipo_old";
      CREATE TYPE "enum_Transaccions_tipo" AS ENUM('Ingreso', 'Retirada');
      ALTER TABLE "Transaccions" ALTER COLUMN "tipo" TYPE "enum_Transaccions_tipo" USING ("tipo"::text::"enum_Transaccions_tipo");
      DROP TYPE "enum_Transaccions_tipo_old";
    `);
  }
};