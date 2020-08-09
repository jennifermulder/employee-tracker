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
    choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add department', 'Update employee Role', 'Update employee Manager', 'View all Roles'],
  }])
    .then(answer => {
      if (answer.initialPrompt == 'View all employees') {
        return viewEmployees();

      } else if (answer.initialPrompt == 'View all departments') {
        return viewEmployeesByDepartment();

      } else if (answer.initialPrompt == 'View all roles') {
        return viewEmployeesByManager();

      } else if (answer.initialPrompt == 'Add employee') {
        return addEmployee();

      } else if (answer.initialPrompt == 'Add department') {
        return addDepartment();

      } else if (answer.initialPrompt == 'Update employee Role') {
        return updateRole();

      } else if (answer.initialPrompt == 'Update employee Manager') {
        return updateManager();

      } else if (answer.initialPrompt == 'View all Roles') {
        return viewRoles();

      } else {
        console.log('Please select an action!');
        return false;
      }
    })
};

function viewEmployees() {
  db.viewEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startNewPrompt());
}

/*
function viewEmployeesByDepartment() {
  'SELECT * FROM employees, group by department_id'
  //same as above?
}

function viewEmployeesByManager() {
  'SELECT * FROM employees, group by manager_id'
  //same as above?
}*/

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

function addEmployee() {
  //pass one array in
  Promise.all([db.getRoles(), db.getManager()])
    //array of roles, array of departments, destructured
    .then(([[roles], [managers]]) => {
      console.log(roles[0]);
      console.log(managers[0]);
      return inquirer.prompt([
        {
          name: 'first_name',
          message: "What is the name of the department?"
        },
        {
          name: 'last_name',
          message: "What is the name of the department?"
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
      console.log("The department has been added!")
      startNewPrompt()
    })
}

function updateEmployee() {
  //pass one array in
  db.getEmployees(){
  }.then([
    inquirer.prompt
    {
      type: 'list',
      name: 'rolePrompt',
      message: "What is the employee's role?",
      //map each with name as display, value as return value
      choices: roles.map(role => ({ name: role.title, value: employee.id })),
    },
  ]).then((employee))
  return getRoles()

}.then([
  inquirer.prompt
    {
    type: 'list',
    name: 'rolePrompt',
    message: "What role to change to?",
    //map each with name as display, value as return value
    choices: roles.map(role => ({ name: role.title, value: employee.id })),
  },
  ).then(({ first_name, last_name, rolePrompt, managerPrompt }) => {
    // CREATE a department
    db.updateEmployee(first_name, last_name, rolePrompt, managerPrompt)
    console.log("The department has been added!")
    startNewPrompt()
  })




  //array of roles, array of departments, destructured
  .then(([[roles], [managers]]) => {
    console.log(roles[0]);
    console.log(managers[0]);
    return inquirer.prompt([
      {
        name: 'first_name',
        message: "What is the name of the department?"
      },
      {
        name: 'last_name',
        message: "What is the name of the department?"
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
    console.log("The department has been added!")
    startNewPrompt()
  })
}


/*
function viewEmployees() {
  db.viewEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startNewPrompt());
}
 
function removeEmployee() {
 
}
 
function updateRole() {
 
}
 
function updateManager() {
 
}
 
function viewRoles() {
 
}
 
*/

// function call to initialize program
startNewPrompt();

