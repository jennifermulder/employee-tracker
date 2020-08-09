const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'local',
  // Your MySQL password
  password: '12345',
  database: 'employeeDB'
});

connection.connect(function (err) {
  if (err) throw err;
})

module.exports = connection;

/*

function viewEmployees() {
  //'SELECT * FROM employees'
  const sql = `SELECT * FROM employees`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.table(rows);
  })
    .then(function () {
      //call repeat here?
      return startNewPrompt();
    }
    )
};


viewEmployees = () => {
  const query = connection.query(
    `SELECT * FROM employees`,

    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      // Call updateProduct() AFTER the INSERT completes
      updateProduct();
    }
  );
  // logs the actual query being run
  console.table(rows);
};




updateProduct = () => {
  console.log('Updating all Rocky Road quantities...\n');
  const query = connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        quantity: 100
      },
      {
        flavor: 'Rocky Road'
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products updated!\n');
      // Call deleteProduct() AFTER the UPDATE completes
      deleteProduct();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

deleteProduct = () => {
  console.log('Deleting all strawberry ice cream...\n');
  const query = connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry'
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products deleted!\n');
      // Call readProducts() AFTER the DELETE completes
      readProducts();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

readProducts = () => {
  console.log('Selecting all products...\n');
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
};

module.export = new EmployeeDatabase(connection)

*/





