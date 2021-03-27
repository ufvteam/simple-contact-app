const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '172.16.196.3',
  user: 'comp430_admin',
  password: '',
  database: 'contact_db',
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
    connection.end();
  }
  console.log('connected!');
});

module.exports = connection;
