require('dotenv').config();
const sequelize = require('./config/db.js');
const inquirer = require('inquirer');

const Employee = require('./models/Employee');
const Department = require('./models/Department');
const Role = require('./models/Role');
const EmployeeTrackerApp = require('./app.js');

const app = new EmployeeTrackerApp();

sequelize.sync().then(() => {
	console.log('Connected to DB.');
	// let dept = Department.create({
	// 	name: 'My Department'
	// });
	// console.log(dept);

	app.run();


});