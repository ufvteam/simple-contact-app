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
      zipcode: data[i].zipcode,
      address: {
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
  db.getContacts(function (data) {
    try {
      if (data) {
        const contacts = convertObj(data);
        res.status(200).json({ contacts: contacts });
      }
    } catch (error) {
      res.status(400).json({ msg: 'Could not fetch the quotes' });
    }
  });
});

// Get single contact
router.get('/:id', function (req, res) {
  const id = req.params.id;
  db.getAContact(id, function (data) {
    try {
      if (data) {
        console.log(data);
        const contact = convertObj(data);
        res.status(200).json({ data: contact });
      }
    } catch (error) {
      res.status(400).json({ msg: 'Could not fetch the quotes' });
    }
  });
});

// Create a contact
router.post('/', function (req, res) {});

// Update 1 contact
router.put('/:id', function (req, res) {});

// Delete a contact
router.delete('/:id', function (req, res) {});

module.exports = router;
