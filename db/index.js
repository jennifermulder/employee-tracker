const connection = require('./database');

class EmployeeDatabase {
  constructor(connection) {
    this.connection = connection;
  }

  //methods
  getDepartments() {
    return this.connection.promise().query(
      "SELECT * FROM department"
    );
  };

  getRoles() {
    return this.connection.promise().query(
      `SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        LEFT JOIN department 
        ON role.department_id = department.id`
    );
  };

  getEmployees() {
    return this.connection.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        LEFT JOIN role 
        ON employee.role_id = role.id 
        LEFT JOIN department 
        ON role.department_id = department.id 
        LEFT JOIN employee manager 
        ON manager.id = employee.manager_id;`
    );
  };

  //used in add employee
  getManager() {
    return this.connection.promise().query(
      "SELECT * FROM employee"
    );
  };

  //res.name
  addDepartment(name) {
    return this.connection.promise().query(
      `INSERT INTO department(name) 
        VALUES(?)`
      //name to replace "?"
      , name)
  };

  addRole(title, salary, department_id) {
    return this.connection.promise().query(
      `INSERT INTO role(title, salary, department_id) 
        VALUES(?,?,?)`
      //to replace "?"
      , [title, salary, department_id])
  };

  //res.firsname, etc., rolePrompt, managerPrompt
  addEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.promise().query(
      `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
        VALUES(?,?,?,?)`
      // to replace "?"
      , [first_name, last_name, role_id, manager_id])
  };

  updateRole(employee_id, role_id) {
    return this.connection.promise().query(
      `UPDATE employee SET role_id = ? WHERE id = ?`,
      // to replace "?"
      [role_id, employee_id])
  };

  //BONUS
  updateManager(employee_id, manager_id) {
    return this.connection.promise().query(
      `UPDATE employee SET manager_id = ? WHERE id = ?`,
      // to replace "?"
      [manager_id, employee_id])
  };

  viewByManager(manager_id) {
    return this.connection.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title 
        FROM employee 
        LEFT JOIN role 
        ON role.id = employee.role_id 
        LEFT JOIN department 
        ON department.id = role.department_id 
        WHERE manager_id = ?;`,
      manager_id)
  };

  viewByDepartment(department_id) {
    return this.connection.promise().query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary 
        FROM employee 
        LEFT JOIN role 
        ON role.id = employee.role_id 
        LEFT JOIN department 
        ON department.id = role.department_id 
        WHERE department.id = ?;`,
      department_id)
  };

  deleteDepartment(id) {
    return this.connection.promise().query(
      `DELETE FROM department WHERE id = ?`
      , id)
  };

  deleteRole(id) {
    return this.connection.promise().query(
      `DELETE FROM role WHERE id = ?`
      , id)
  };

  deleteEmployee(id) {
    return this.connection.promise().query(
      `DELETE FROM employee WHERE id = ?`
      , id)
  };

};

module.exports = new EmployeeDatabase(connection)