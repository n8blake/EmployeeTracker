const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');

class Role extends Sequelize.Model {}

Role.init(
	{
		role_id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
    	},
		title: {
			type: Sequelize.DataTypes.STRING,
		},
		salary: {
			type: Sequelize.DataTypes.DECIMAL,
		},
		department_id: {
			type: Sequelize.DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'role',
	}
);

module.exports = Role;