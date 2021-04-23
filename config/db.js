const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_DATABASE, 
	process.env.DB_USER, 
	process.env.DB_PASSWORD,
	{
		host: 'localhost',
		port: 8889,
		dialect: 'mysql'
	}
);

module.exports = sequelize;