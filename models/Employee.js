const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

class Employee extends Sequelize.Model {}

Employee.init(
	{
		employee_id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
    	},
		first_name: {
			type: Sequelize.DataTypes.STRING,
		},
		last_name: {
			type: Sequelize.DataTypes.STRING,
		},
		role_id: {
			type: Sequelize.DataTypes.INTEGER,
			references: {
				model: 'role',
				key: 'role_id'
			}
		},
		manager_id: {
			type: Sequelize.DataTypes.INTEGER,
			references: {
				model: 'employee', 
				key: 'employee_id'
			}
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'employee',
	}
);

module.exports = Employee;