const connection = require('./database');

class EmployeeDatabase {
  constructor(connection) {
    this.connection = connection;
  }
  //methods
  viewEmployees() {
    return this.connection.promise().query(
      //"SELECT * FROM employees" 
      `SELECT employee.id, employee.first_name, role.title, department.name, role.salary, employee.manager_id
                FROM employee 
                LEFT JOIN role 
                ON employee.role_id = role.id
                LEFT JOIN department 
                ON role.department_id = department.id`
    );
  };

  getRoles() {
    return this.connection.promise().query(
      "SELECT * FROM role"
    );
  };

  getDepartments() {
    return this.connection.promise().query(
      "SELECT * FROM department"
    );
  };

  getManager() {
    return this.connection.promise().query(
      "SELECT * FROM employee"
    );
  };

  viewEmployeesByDepartment() {
    return this.connection.promise().query(
      "SELECT * FROM employees GROUP BY department_id"
    );
  };

  viewEmployeesByManagert() {
    return this.connection.promise().query(
      "SELECT * FROM employees GROUP BY manager_id"
    );
  };


  //view all departments: department names, department ids
  //view all roles: job title, role id, department for role, salary
  //view all employees: employee id, first name, last name, title, departments, salaries, managers
  //add a department: enter name of department => department is added to the database
  //add a role: name, salary, department => role is added to the database
  //add an employee: add first name, last name, role, manager, => add to the database
  //update an employee role: select employee from list to update, select role from list => add to the database

  //res.firsname, etc., rolePrompt, managerPrompt
  addEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.promise().query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES (?,?,?,?)`
      // to replace "?"
      , [first_name, last_name, role_id, manager_id])
  };

  //res.name
  addDepartment(name) {
    return this.connection.promise().query(
      `INSERT INTO department (name) 
        VALUES (?)`
      //name to replace "?"
      , name)
  };




  removeEmployee() {
    return this.connection.promise().query(

    );
  };

  updateRole() {
    return this.connection.promise().query(

    );
  };

  updateManager() {
    return this.connection.promise().query(

    );
  };

  viewRoles() {
    return this.connection.promise().query(

    );
  };
};

module.exports = new EmployeeDatabase(connection)