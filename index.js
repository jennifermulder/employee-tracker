//require db variable from database.js
const db = require('./db');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { promise } = require('./db/database');

//prompt user what they want to do
const startNewPrompt = () => {
  console.log("start")
  inquirer.prompt([{
    type: 'list',
    name: 'initialPrompt',
    message: 'What would you like to do?',
    //update to proper prompts
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
  }])
    .then(answer => {
      if (answer.initialPrompt == 'View all departments') {
        return viewDepartments();

      } else if (answer.initialPrompt == 'View all roles') {
        return viewRoles();

      } else if (answer.initialPrompt == 'View all employees') {
        return viewEmployees();

      } else if (answer.initialPrompt == 'Add a department') {
        return addDepartment();

      } else if (answer.initialPrompt == 'Add a role') {
        return addRole();

      } else if (answer.initialPrompt == 'Add an employee') {
        return addEmployee();

      } else if (answer.initialPrompt == 'Update an employee role') {
        return updateRole();

        // } else if (answer.initialPrompt == 'Update employee Manager') {
        //   return updateManager();

        // } else if (answer.initialPrompt == 'View all Roles') {
        //   return viewRoles();

      } else {
        console.log('Please select an action!');
        return false;
      }
    })
};

function viewDepartments() {
  db.getDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startNewPrompt());
}

function viewRoles() {
  db.getRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startNewPrompt());
}

function viewEmployees() {
  db.getEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startNewPrompt());
}

function addDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      message: "What is the name of the department?"
    },
  ]).then(res => {
    // CREATE a department
    db.addDepartment(res.name)
    console.log("The department has been added!")
    startNewPrompt()
  })
}

function addRole() {
  //pass one array in
  db.getDepartments()
    .then(([departments]) => {
      return inquirer.prompt([
        {
          name: 'title',
          message: "What is the name of the role?"
        },
        {
          name: 'salary',
          message: "What is the salary amount?"
        },
        {
          type: 'list',
          name: 'departmentPrompt',
          message: "What is the role's department?",
          //map each with name as display, value as return value
          choices: departments.map(department => ({ name: department.name, value: department.id })),
        },
      ])
    },
      //destructure result object to FN, LM, etc.
    ).then(({ title, salary, departmentPrompt }) => {
      // CREATE a role
      db.addRole(title, salary, departmentPrompt)
      console.log("The role has been added!")
      startNewPrompt()
    })
}

function addEmployee() {
  //pass one array in
  Promise.all([db.getRoles(), db.getManager()])
    //array of roles, array of departments, destructured
    .then(([[roles], [managers]]) => {
      // console.log(roles[0]);
      // console.log(managers[0]);
      return inquirer.prompt([
        {
          name: 'first_name',
          message: "What is the employee's first name?"
        },
        {
          name: 'last_name',
          message: "What is the employee's last name?"
        },
        {
          type: 'list',
          name: 'rolePrompt',
          message: "What is the employee's role?",
          //map each with name as display, value as return value
          choices: roles.map(role => ({ name: role.title, value: role.id })),
        },
        {
          type: 'list',
          name: 'managerPrompt',
          message: "What is the employee's manager?",
          //array
          choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
        }
      ])
    }
      //destructure result object to FN, LM, etc.
    ).then(({ first_name, last_name, rolePrompt, managerPrompt }) => {
      // CREATE a department
      db.addEmployee(first_name, last_name, rolePrompt, managerPrompt)
      console.log("The employee has been added!")
      startNewPrompt()
    })
}

//update to get list of employees to be able to choose from employee list
//ask which role to change to to use as input " update role x where employee is = to . SET ROLE TO, WHERE EMPLOYEE IS EQUAL TO"
function updateRole() {
  //pass one array in
  db.getEmployees()
    .then(([employees]) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeePrompt',
          message: "Which employee do you want to update?",
          //map each with name as display, value as return value. Map with employee object array
          choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
        }])
      //??
    }).then((employeePrompt) => {
      return db.getRoles()
    }).then(([roles]) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'rolePrompt',
          message: "What role do you want to update the employee to?",
          //map each with name as display, value as return value
          choices: roles.map(role => ({ name: role.title, value: role.id })),
        }])
    }).then(({ employeePrompt, rolePrompt }) => {
      // Update role
      db.updateRole(employeePrompt, rolePrompt)
      console.log("The employee's role has been updated!")
      startNewPrompt()
    })
}

//updateManager() {
//   return this.connection.promise().query(

//   );
// };

// viewEmployeesByManager() {
//  'SELECT * FROM employees, group by manager_id'
// };

// viewEmployeesByDepartment() {
//  'SELECT * FROM employees, group by department_id'
// };

// deleteDepartment

// deleteRole

// deleteEmployee

// view the total combined salaries in a department

// function call to initialize program
startNewPrompt();

