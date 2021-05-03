require('dotenv').config();
const sequelize = require('./config/db.js');
const inquirer = require('inquirer');

const EmployeeTrackerApp = require('./app.js');

const {Department, Employee, Role} = require('./models');

const app = new EmployeeTrackerApp();

sequelize.sync({ force: false }).then(() => {
	console.log('Connected to DB.');
	app.run();
});