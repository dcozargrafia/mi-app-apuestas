const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const CasaApuestas = sequelize.define('CasaApuestas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  saldoInicial: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = CasaApuestas;
