const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'sql472.main-hosting.eu',
  user: 'u669410571_contact_admin',
  password: 'Contact1',
  database: 'u669410571_contact_db',
});

connection.getConnection(function (error) {
  if (error) {
    console.log(error);
    connection.release();
  }
  console.log('Database Connected!');
});

function queryDatabase(query, callback) {
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err);
      callback(err, function () {
        connection.release();
      });
      return;
    }

    callback(results, function () {
      connection.release();
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
      email VARCHAR(60) DEFAULT NULL
    );
  `;
  queryDatabase(query, callback);
}

function createPhoneTable(callback) {
  let query = `
    CREATE TABLE IF NOT EXISTS Phone_Numbers(
      phoneID INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      contactID INT(11) NOT NULL,
      number VARCHAR(20),
      FOREIGN KEY (contactID) REFERENCES Contact (contactID) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `;
  queryDatabase(query, callback);
}

function createLocationTable(callback) {
  let query = `
    CREATE TABLE IF NOT EXISTS Location(
      contactID INT(11) NOT NULL,
      zipcode VARCHAR(10) NOT NULL,
      street VARCHAR(60) NOT NULL,
      city VARCHAR(20) NOT NULL,
      province VARCHAR(20) NOT NULL,
      country VARCHAR(20) NOT NULL,
      PRIMARY KEY(contactID, zipcode),
      FOREIGN KEY (contactID) REFERENCES Contact (contactID) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `;
  queryDatabase(query, callback);
}

// Execute the table creation when connecting to server
createContactTable(function (data) {
  try {
    if (data) console.log('Contact Table Created/Connected!');
  } catch (error) {
    console.log('Could not create Contact Table');
  }
});

createPhoneTable(function (data) {
  try {
    if (data) console.log('Phone_Numbers Table Created/Connected!');
  } catch (error) {
    console.log('Could not create Phone_Numbers Table');
  }
});

createLocationTable(function (data) {
  try {
    if (data) console.log('Location Table Created/Connected!');
  } catch (error) {
    console.log('Could not create Location Table');
  }
});

/**
 * CRUD operations: GET, POST, PUT, DELETE
 */

// Get all contacts
function getContacts(callback) {
  let query = `
    SELECT c.contactID, c.firstName, c.lastName, c.email, GROUP_CONCAT(p.number ORDER BY p.phoneID ) AS phoneNumbers, 
    GROUP_CONCAT(p.phoneID ORDER BY p.phoneID) AS phoneIDs, l.zipcode, l.street, l.city, l.province, l.country
    FROM Contact c,  Phone_Numbers p, Location l
    WHERE c.contactID = p.contactID AND
          c.contactID = l.contactID     
    GROUP BY c.contactID ORDER BY c.contactID DESC;
  `;
  queryDatabase(query, callback);
}

// Get a contact
function getAContact(id, callback) {
  let query = `
  SELECT c.contactID, c.firstName, c.lastName, c.email, GROUP_CONCAT(p.number ORDER BY p.phoneID ) AS phoneNumbers, 
  GROUP_CONCAT(p.phoneID ORDER BY p.phoneID) AS phoneIDs, l.zipcode, l.street, l.city, l.province, l.country
  FROM Contact c,  Phone_Numbers p, Location l
  WHERE c.contactID = p.contactID AND
        c.contactID = l.contactID AND 
        c.contactID = ${id};
  `;
  queryDatabase(query, callback);
}

// Create a contact
function insertContact(contact, callback) {
  let query = `INSERT INTO Contact(firstName, lastName, email) VALUES("${contact.firstName}", "${contact.lastName}", "${contact.email}");`;
  queryDatabase(query, callback);
}
function insertPhoneNumbers(contact, insertId, callback) {
  for (let i = 0; i < contact.phoneNumbers.length; i++) {
    let query = `INSERT INTO Phone_Numbers(contactID, number) VALUES(${insertId}, "${contact.phoneNumbers[i]}")`;
    queryDatabase(query, callback);
  }
}
function insertLocation(contact, insertId, callback) {
  let query = `INSERT INTO Location(contactID, zipcode, street, city, province, country) VALUES(${insertId}, "${contact.address.zipcode}", 
                "${contact.address.street}", "${contact.address.city}", "${contact.address.province}", "${contact.address.country}");`;
  queryDatabase(query, callback);
}

function updateContact(id, contact) {
  try {
    // Update contact table
    let contactTable = `UPDATE Contact SET firstName = "${contact.firstName}", lastName = "${contact.lastName}", email = "${contact.email}" WHERE contactID = ${id}`;
    queryDatabase(contactTable, function (data) {
      if (data) {
        console.log('Contact Table Updated!');
      }
    });

    // Update location table
    let locationTable = `UPDATE Location SET zipcode = "${contact.address.zipcode}", street = "${contact.address.street}", city = "${contact.address.city}", 
                      province = "${contact.address.province}", country = "${contact.address.country}" WHERE contactID = ${id};`;

    queryDatabase(locationTable, function (data) {
      if (data) {
        console.log('Location Table Updated!');
      }
    });

    // Update phone table
    for (let i = 0; i < contact.phoneIDs.length; i++) {
      let query = `UPDATE Phone_Numbers SET number = "${contact.phoneNumbers[i]}" WHERE phoneID = ${contact.phoneIDs[i]} AND contactID = ${id}`;
      queryDatabase(query, function (data) {
        if (data) {
          console.log(`Phone number ${i + 1} updated`);
        }
      });
    }
    return true;
  } catch (error) {
    return false;
  }
}

function deleteAContact(id, callback) {
  let query = `DELETE FROM Contact WHERE contactID = ${id}`;
  queryDatabase(query, callback);
}

function deleteAllContacts(callback) {
  let query = `DELETE FROM Contact`;
  queryDatabase(query, callback);
}


function deletePhoneNumber(id, callback) {
  let query = `DELETE FROM Phone_Numbers WHERE phoneID = ${id}`;
  queryDatabase(query, callback);
}

module.exports = {
  getContacts,
  getAContact,
  insertContact,
  insertPhoneNumbers,
  insertLocation,
  updateContact,
  deleteAContact,
  deletePhoneNumber,
 deleteAllContacts
};
