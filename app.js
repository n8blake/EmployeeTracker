const inquirer = require('inquirer');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const Role = require('./models/Role');
const cTable = require('console.table');

class EmployeeTrackerApp {

	run = async () => {
		let running = true;
		while(running){
			const task = await this.showStartMenuOptions();
			if(task === 'Exit'){
				running = false
			} else {
				
			}
		}
	}

	showStartMenuOptions = () => {
		const startMenuQuestion = {
			type: 'list',
			message: 'What would you like to do?',
			name: 'task',
			choices: ['View Departments', 
				'View Roles', 
				'View All Employees',
				'Exit' 
			],
		};
		return inquirer.prompt(startMenuQuestion).then(async (data) => {
			return data.task;
		});
	}



}

module.exports = EmployeeTrackerApp;