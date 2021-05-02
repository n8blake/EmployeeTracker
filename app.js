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
			'Add New Employee': this.addEmployee,
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
		return await inquirer.prompt(newDepartmentQuestion).then(async (data) => {
			newDepartment.name = data.departmentName;
			const dept = await Department.create(newDepartment);
			if(dept){
				console.log("Created new department: " + dept.name);
			}
			return dept;
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
			console.log("Updated department: " + dept.name);
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
		return await inquirer.prompt(newRoleQuestions).then(async (data) => {
			const newRole = {};
			newRole.title = data.roleName;
			newRole.salary = data.salary;
			departments.forEach(department => {
				if(department.name === data.department){
					newRole.department_id = department.department_id;
				}
			});
			const role = await Role.create(newRole);
			if(role) console.log("Create new role: " + role.name);
			return role;
		});

	}

	viewEmployees = async () => {
		let employees = [];
		await Employee.findAll().then(data => {
			data.forEach(employee => {
				employees.push(employee.dataValues);
			});
		});
		console.table(employees);
	}

	addEmployee = async () => {
		let roles = await Role.findAll().then(data => {
			let _roles = [];
			data.forEach(role => {
				_roles.push(role.dataValues);
			});
			return _roles;
		});
		let roleNames = [];
		roles.forEach(role => {
			roleNames.push(role.name);
		});

		let employees = [];
		await Employee.findAll().then(data => {
			data.forEach(employee => {
				employees.push(employee.dataValues);
			});
		});
		let employeeNames = [];
		employees.forEach(employee => {
			employeeNames.push(employee.first_name + " " + employee.last_name);
		});
		employeeNames.push("No manager");

		const newEmployeeQuestions = [
			{
				type: 'text',
				message: 'First Name:',
				name: 'firstName'
			},
			{
				type: 'text',
				message: 'Last Name:',
				name: 'lastName'
			},
			{
				type: 'list',
				message: 'Select a role: ',
				name: 'role',
				choices: roleNames,
			},
			{
				type: 'list',
				message: 'Select a manager: ',
				name: 'manager', 
				choices: employeeNames
			}
		];
		return await inquirer.prompt(newEmployeeQuestions).then(async (data) => {
			const newEmployee = {};
			newEmployee.first_name = data.firstName;
			newEmployee.last_name = data.lastName;
			roles.forEach(role => {
				if(role.title === data.role){
					newEmployee.role_id = role.role_id;
				}
			});
			employees.forEach(employee => {
				const employeeName = employee.first_name + " " + employee.last_name;
				if(employeeName === data.manager){
					newEmployee.manager_id = employee.employee_id;
				};
			});
			return await Employee.create(newEmployee);
			console.log("New employee created");

		});
		
	}

	exit = () => {
		return 'Exit';
	}

}

module.exports = EmployeeTrackerApp;