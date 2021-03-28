const express = require('express');
const router = express.Router();

const db = require('../database/db');

function convertObj(data) {
  let contacts = [];
  for (let i = 0; i < data.length; i++) {
    const phoneNumbers = data[i].phoneNumbers.split(',');
    const phoneIDs = data[i].phoneIDs.split(',');

    const contact = {
      contactID: data[i].contactID,
      firstName: data[i].firstName,
      lastName: data[i].lastName,
      email: data[i].email,
      phoneNumbers: phoneNumbers,
      phoneIDs: phoneIDs,
      address: {
        zipcode: data[i].zipcode,
        street: data[i].street,
        city: data[i].city,
        province: data[i].province,
        country: data[i].country,
      },
    };
    contacts.push(contact);
  }
  return contacts;
}

// Get all contacts
router.get('/', function (req, res) {
  try {
    db.getContacts(function (data) {
      if (data) {
        const contacts = convertObj(data);
        res.status(200).json({ contacts: contacts });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: 'Could not fetch the contacts' });
  }
});

// Get single contact
router.get('/:id', function (req, res) {
  const id = req.params.id;
  try {
    db.getAContact(id, function (data) {
      if (data) {
        const contact = convertObj(data);
        res.status(200).json({ data: contact });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: 'Could not fetch the contacts' });
  }
});

// Create a contact
router.post('/', function (req, res) {
  let insertId;
  try {
    db.insertContact(req.body, function (result) {
      if (result) {
        insertId = result.insertId;
        console.log('Contact inserted into Contact table');
        db.insertPhoneNumbers(req.body, insertId, function (phoneResult) {
          if (phoneResult !== undefined || phoneResult) {
            console.log('Phone Number Inserted');
          }
        });

        db.insertLocation(req.body, insertId, function (locationResult) {
          if (locationResult !== undefined || locationResult) {
            console.log('Location Inserted');
          }
        });
      }
    });

    res.status(200).json({ msg: 'Contacted created successfully!' });
  } catch (error) {
    res.status(400).json({ msg: 'Could not create a contact' });
  }
});

// Update 1 contact
router.put('/:id', function (req, res) {});

// Delete a contact
router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    db.deleteAContact(id, function (data) {
      if (data != undefined || data) {
        res.status(200).json({ msg: 'Contact sucessfully deleted!' });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: 'Could not delete the contact' });
  }
});

// Delete a phone number
router.delete('/phones/:id', function (req, res) {
  const id = req.params.id;
  try {
    db.deletePhoneNumber(id, function (data) {
      if (data != undefined || data) {
        res.status(200).json({ msg: 'Phone number sucessfully deleted!' });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: 'Could not delete the phone number' });
  }
});

module.exports = router;
