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
      number VARCHAR(20) NOT NULL,
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
      city VARCHAR(20) NOT NULL,
      province VARCHAR(20) NOT NULL,
      country VARCHAR(20) NOT NULL
    );
  `;
  queryDatabase(query, callback);
}

// Execute the table creation when connecting to server
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

// Get all contacts
function getContacts(callback) {
  let query = `
    SELECT c.contactID, c.firstName, c.lastName, c.email, GROUP_CONCAT(p.number ORDER BY p.phoneID ) AS phoneNumbers, GROUP_CONCAT(p.phoneID ORDER BY p.phoneID) AS phoneIDs, c.zipcode, l.street, l.city, l.province, l.country
    FROM Contact c,  Phone_Numbers p, Location l
    WHERE c.contactID = p.contactID AND
          c.zipcode = l.zipcode
    GROUP BY c.contactID;
  `;
  queryDatabase(query, callback);
}

// Get a contact
function getAContact(id, callback) {
  let query = `
    SELECT c.contactID, c.firstName, c.lastName, c.email, GROUP_CONCAT(p.number ORDER BY p.phoneID ) AS phoneNumbers, GROUP_CONCAT(p.phoneID ORDER BY p.phoneID) AS phoneIDs, c.zipcode, l.street, l.city, l.province, l.country
    FROM Contact c,  Phone_Numbers p, Location l
    WHERE c.contactID = p.contactID AND
          c.zipcode = l.zipcode AND 
          c.contactID = ${id};
  `;
  queryDatabase(query, callback);
}
module.exports = {
  getContacts: getContacts,
  getAContact: getAContact,
};
