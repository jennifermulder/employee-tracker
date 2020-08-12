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






