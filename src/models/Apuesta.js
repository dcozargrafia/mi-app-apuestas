const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const CasaApuestas = require('./CasaApuestas');

const Apuesta = sequelize.define('Apuesta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idGrupo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fechaApuesta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    casaApuestasId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CasaApuestas,
            key: 'id'
        }
    },
    tipoApuesta: {
        type: DataTypes.ENUM('Calificante', 'Relleno', 'FreeBet', 'Aumento de Cuota', 'Exchange'),
        allowNull: false
    },
    evento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaEvento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    mercado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    importe: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cuota: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Abierta', 'Ganada', 'Perdida', 'Cancelada'),
        allowNull: false,
        defaultValue: 'Abierta'
    },
    riesgo: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true     
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true // Esto añadirá automáticamente createdAt y updateAt

});

Apuesta.belongsTo(CasaApuestas, { foreignKey: 'casaApuestasId' });
CasaApuestas.hasMany(Apuesta, { foreignKey: 'casaApuestasId' });

module.exports = Apuesta

