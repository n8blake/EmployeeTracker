require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = require('../config/db.js');
const Department = require('../models/Department');

//jest.mock('sequelize');
//jest.mock('../models/Department');

describe('Department', () => {
	let myDepartment = {};

	describe('create', () => {
		it('should create a new department in the db', async () => {
			
			// let sq = await sequelize.sync().then( async () => {
			// 	myDepartment = await Department.create({
			// 		name: 'Test_Department'
			// 	});
			// }); 
			// Department.create.mockResolvedValue({name: 'Test_Department'});
			myDepartment = await Department.create({
					name: 'Test_Department',
					department_id: 1
			});
			expect('department_id' in myDepartment).toBe(true);
			expect('name' in myDepartment).toBe(true);
			expect(myDepartment.name).toEqual('Test_Department');
			expect(myDepartment instanceof Department).toBe(true);
		});
	});

	describe('read', () => {
		it('should get a department by id', async () => {
			let id = 1;
			let obj = {}
			let _obj = await Department.findByPk(id).then((data) => {
				obj = data;
			});
			expect('department_id' in obj).toBe(true);
			expect(obj instanceof Department).toBe(true);
		});
	});

	describe('update', () => {
		it('should update a department', async () => {
			let obj = {};
			let _obj = await Department.update(
				{
					name: 'My_New_Test_Title'
				},
				{
					where: {
						department_id: 1
					}
				}
			).then(async () => {
				let _obj2 = await Department.findByPk(1).then((data) => {
					obj = data;
				});
			});
			expect(obj instanceof Department).toBe(true);
			expect(obj.name).toEqual('My_New_Test_Title');

			_obj = await Department.update(
				{
					name: 'Test_Title'
				},
				{
					where: {
						department_id: 1
					}
				}
			).then(async () => {
				let _obj2 = await Department.findByPk(1).then((data) => {
					obj = data;
				});
			});

			expect(obj.name).toEqual('Test_Title');

		});
	});

	describe('destroy', () => {
		it('should destroy a department record', async () => {
			const id = 1;
			await Department.destroy({
				where:{
					department_id: id
				}
			});
			
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