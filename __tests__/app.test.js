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

});