const Department = require('./Department');
const Employee = require('./Employee');
const Role = require('./Role');

Employee.belongsTo(Role, {
  foreignKey: 'role_id',
});

Employee.belongsTo(Employee, {
	foreignKey: 'manager_id',
	as: 'Manager'
});

Role.hasMany(Employee, {
  foreignKey: 'employee_id',
});

Role.belongsTo(Department, {
	foreignKey: 'department_id',
});

Department.hasMany(Role, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE',
});

module.exports = { Department, Employee, Role };
