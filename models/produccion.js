'use strict';
const { Model, DataTypers, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Produccion extends Model {
        static associate(models) {
        }
    }
    Produccion.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        producto_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        unidades_producidas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        defectuosas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        porcentajeDefectuosos: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
        {
            sequelize,
            modelName: "Produccion",
            tableName: "produccion",
            timestamps: true,
        }

    )
    return Produccion
}