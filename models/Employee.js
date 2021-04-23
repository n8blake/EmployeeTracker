const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

class Employee extends Sequelize.Model {}

Employee.init(
	{
		employee_id: {
			type: DataTypes.INTEGER,
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
		},
		manager_id: {
			type: Sequelize.DataTypes.INTEGER,
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