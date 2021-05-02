require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');
const inquirer = require('inquirer');
const EmployeeTrackerApp = require('../app.js');

jest.mock('inquirer');

describe('App', () => {

	const app = new EmployeeTrackerApp();

	it('should have choices', () => {
		expect(Object.keys(app.choices).length > 0).toBe(true);
	});

	describe('showMenuOptions', () => {

		it('should show the menu options', () => {

			inquirer.prompt.mockResolvedValue('Exit');
			let option = app.showMenuOptions();
			expect(inquirer.prompt).toHaveBeenCalled();
			//expect(option).toEqual('Exit');

		});

	});

	describe('addDepartment', () => {
		it('should add a new department', async () => {
			const department = {
				departmentName: 'Test Department'
			};
			inquirer.prompt.mockResolvedValue(department);
			const dept = await app.addDepartment();
			expect(dept.name).toEqual(department.departmentName);
		});
	});

	describe('addRole', () => {
		it('should add a role', async () => {
			const role = {
				title = 'Project Manager',
				salary = 95000.00,
				department = 'Development Department'
			};
			inquirer.prompt.mockResolvedValue(role);
			const newRole = await app.addRole();
			expect(newRole.title).toEqual(role.title);
		});
	});

	describe('addEmployee', () => {

		it('should add a new employee', async () => {
			const employee = {
				firstName: 'Kevin',
				lastName: 'Smith',
				role: 'Worker',
				manager: 'John Doe'
			}
			inquirer.prompt.mockResolvedValue(employee);
			const emp = await app.addEmployee();
			expect(emp.first_name).toEqual(employee.firstName);			
		});

	});

	describe('end', () => {
		it('should close the database', async () => {
			let done = false;
			await sequelize.connectionManager.close().then(() => {
				done = true;
				console.log('shut down gracefully');
			});
			expect(done).toBe(true);
		});
	});

});