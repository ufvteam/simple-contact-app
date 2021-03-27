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

function queryDatabase(query, callback) {
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err);
      callback(err, function () {
        connection.end();
      });
      return;
    }

    callback(results, function () {
      connection.end();
    });
  });
}

// Create table
function createContactTable(callback) {
  let query = `
  CREATE TABLE IF NOT EXISTS Contact(
    contactID INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    email VARCHAR(60) DEFAULT NULL,
    zipcode VARCHAR(10) NOT NULL
  );
  `;
  queryDatabase(query, callback);
}

function createPhoneTable(callback) {
  let query = `
  CREATE TABLE IF NOT EXISTS Phone_Numbers(
    phoneID INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contactID INT(11) NOT NULL,
    number VARCHAR(15) NOT NULL,
    FOREIGN KEY (contactID) REFERENCES Contact (contactID) ON DELETE CASCADE ON UPDATE CASCADE
  );
  `;
  queryDatabase(query, callback);
}

function createLocationTable(callback) {
  let query = `
  CREATE TABLE IF NOT EXISTS Location(
    zipcode VARCHAR(10) NOT NULL PRIMARY KEY,
    street VARCHAR(60) NOT NULL,
    province VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL
  );
  `;
  queryDatabase(query, callback);
}

createContactTable(function (data) {
  try {
    if (data) console.log('Contact Table Created!');
  } catch (error) {
    console.log('Could not create Contact Table');
  }
});

createPhoneTable(function (data) {
  try {
    if (data) console.log('Phone_Numbers Table Created!');
  } catch (error) {
    console.log('Could not create Phone_Numbers Table');
  }
});

createLocationTable(function (data) {
  try {
    if (data) console.log('Location Table Created!');
  } catch (error) {
    console.log('Could not create Location Table');
  }
});
