const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Appointment extends Model {
}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        datetime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'client',
                key: 'id'
            }
        },
        hauskeepr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hauskeepr',
                key: 'id'
            }
        },
        // chore_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'chore',
        //         key: 'chore_id'
        //     }
        // },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'appointment'
    }
);

module.exports = Appointment;
