const inquirer = require('inquirer');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const Role = require('./models/Role');
const cTable = require('console.table');

class EmployeeTrackerApp {

	constructor(){
		this.choices = {
			'View Departments': this.viewDepartments,
			'View Roles': this.viewRoles,
			'View All Employees': this.viewEmployees,
			'Add New Department': this.addDepartment,
			'Add New Role': this.addRole,
			'Exit\n': this.exit
		}
	}

	run = async () => {
		let running = true;
		while(running){
			//console.clear();
			const task = await this.showMenuOptions();
			//console.clear();
			let choice = await this.choices[task]();
			if(choice === 'Exit'){
				console.log("\nExiting...\n");
				running = false;
			} 
		}
	}

	showMenuOptions = () => {
		let menuChoices = [];
		Object.keys(this.choices).forEach(key => {
			menuChoices.push(key);
		});
		const menuQuestion = {
			type: 'list',
			message: 'What would you like to do?',
			name: 'task',
			choices: menuChoices,
		};
		//console.clear();
		return inquirer.prompt(menuQuestion).then(async (data) => {
			return data.task;
		});
	}

	viewDepartments = async () => {
		let departments = [];
		await Department.findAll().then(data => {
			//console.log(data);
			data.forEach(dept => {
				departments.push(dept.dataValues);
			});
		});
		console.table(departments);
	}

	addDepartment = async () => {
		let newDepartment = {};
		const newDepartmentQuestion = {
			type: 'text',
			message: 'New Department Name:',
			name: 'departmentName'
		}
		await inquirer.prompt(newDepartmentQuestion).then(async (data) => {
			newDepartment.name = data.departmentName;
			const dept = await Department.create(newDepartment);
			if(dept){
				console.log("Created new department: " + dept.name);
			}
		});
	}

	updateDepartmentPrompt = async () => {
		let departments = [];
		await Department.findAll().then(data => {
			//console.log(data);
			data.forEach(dept => {
				departments.push(dept.dataValues);
			});
		});
		const updateDepartmentQuestion = {
			type: 'list',
			message: 'What would you like to do?',
			name: 'task',
			choices: departmentChoices,
		};
		await inquirer.prompt(updateDepartmentQuestion).then(async (data) => {
			newDepartment.name = data.departmentName;
			
		});
	};

	updateDepartment = async (department) => {
		const dept = await Department.update(department, {
			where: {
				department_id: department.department_id
			}
		});
		if(dept){
			console.log("Created new department: " + dept.name);
		}
	}

	viewRoles = async () => {
		let roles = [];
		await Role.findAll().then(data => {
			data.forEach(role => {
				roles.push(role.dataValues);
			});
		});
		console.table(roles);
	}

	addRole = async () => {
		let departments = await Department.findAll().then(data => {
			let _departments = [];
			data.forEach(dept => {
				_departments.push(dept.dataValues);
			});
			return _departments;
		});
		let departmentNames = [];
		departments.forEach(department => {
			departmentNames.push(department.name);
		});
		// role name
		// department
		// salary
		const newRoleQuestions = [
			{
				type: 'text',
				message: 'New Role Name:',
				name: 'roleName'
			},
			{
				type: 'double', 
				message: 'Salary:',
				name: 'salary'
			},
			{
				type: 'list',
				message: 'Which department is the role in?',
				name: 'department',
				choices: departmentNames,
			}
		];
		await inquirer.prompt(newRoleQuestions).then(async (data) => {
			const newRole = {};
			newRole.name = data.roleName;
			newRole.salary = data.salary;
			departments.forEach(department => {
				if(department.name === data.department){
					newRole.department_id = department.department_id;
				}
			});
			const role = await Role.create(newRole);
			if(role) console.log("Create new role: " + role.name);
		});

	}

	viewEmployees = async (emp) => {
		let employees = [];
		await Employee.findAll().then(data => {
			data.forEach(employee => {
				employees.push(employee.dataValues);
			});
		});
		console.table(employees);
	}

	exit = () => {
		return 'Exit';
	}

}

module.exports = EmployeeTrackerApp;