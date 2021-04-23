const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

class Department extends Sequelize.Model {}

Department.init(
	{
		department_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
    	},
		name: {
			type: Sequelize.DataTypes.STRING,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'department',
	}
);

module.exports = Department;