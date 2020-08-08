const express = require('express');
// const inputCheck = require('./utils/inputCheck');
//require db variable from database.js
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

//requires index.js
const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);


//prompt user what they want to do
const startNewPrompt = () => {
  return inquirer.prompt([{
    type: 'list',
    name: 'initialPrompt',
    message: 'What would you like to do?',
    choices: ['View all employees', 'View all employees by department', 'View all employees by Manager', 'Add employee', 'Remove employee', 'Update employee Role', 'Update employee Manager', 'View all Roles'],
  }])
    .then(answer => {
      if (answer.initialPrompt == 'View all employees') {
        return viewEmployees();

      } else if (answer.initialPrompt == 'View all employees by department') {
        return viewEmployeesByDepartment();

      } else if (answer.initialPrompt == 'View all employees by Manager') {
        return viewEmployeesByManager();

      } else if (answer.initialPrompt == 'Add employee') {
        return addEmployee();

      } else if (answer.initialPrompt == 'Remove employee') {
        return removeEmployee();

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
  //'SELECT * FROM employees'
  router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  //call repeat here?
  startNewPrompt();
}

function viewEmployeesByDepartment() {
  'SELECT * FROM employees, group by department_id'
  //same as above?
}

function viewEmployeesByManager() {
  'SELECT * FROM employees, group by manager_id'
  //same as above?
}

function addEmployee() {
  prompt([
    {
      name: 'first_name',
      message: "What is the employee's first name"
    },

    {
      name: 'last_name',
      message: "What is the employee's last name"
    }

  ]).then(res => {
    // CREATE an employee
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
  VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, manager_id];
    // ES5 function, not arrow function, to use 'this'
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      //returns data and ID of the added candidate. statement object?
      res.json({
        message: 'success',
        data: body,
        id: this.lastID
      });
    });
  })
}

function removeEmployee() {

}

function updateRole() {

}

function updateManager() {

}

function viewRoles() {
  //???
  router.get('/role', (req, res) => {
    const sql = `SELECT * FROM roles`;
    const params = [];

    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({
        message: 'success',
        data: rows
      });
    });
  });
}



// function call to initialize program
newPrompt();