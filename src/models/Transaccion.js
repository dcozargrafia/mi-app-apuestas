const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const CasaApuestas = require('./CasaApuestas');

const Transaccion = sequelize.define('Transaccion', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isBefore: new Date().toISOString() // La fecha no puede ser futura
    }
  },
  casaApuestasId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CasaApuestas,
      key: 'id'
    },
    validate: {
      isInt: true,
      min: 1
    }
  },
  tipo: {
    type: DataTypes.ENUM('Depósito', 'Retiro'),
    allowNull: false,
    validate: {
      isIn: [['Depósito', 'Retiro']]
    }
  },
  importe: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01
    }
  },
  comentarios: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 500] // Máximo 500 caracteres
    }
  }
});

Transaccion.belongsTo(CasaApuestas, { foreignKey: 'casaApuestasId' });
CasaApuestas.hasMany(Transaccion, { foreignKey: 'casaApuestasId' });

module.exports = Transaccion;