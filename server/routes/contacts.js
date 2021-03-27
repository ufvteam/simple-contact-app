const express = require('express');
const router = express.Router();

// Get all contacts
router.get('/', function (req, res) {
  const contacts = [
    {
      contactID: 1,
      fname: 'John',
      lname: 'Doe',
      phone: ['123-456-7890', '122-888-9999'],
      email: 'test@gmail.com',
      zipcode: 'v2s 2t1',
      address: {
        street: '158 12th Ave',
        city: 'Surrey',
        province: 'British Columbia',
        country: 'Canada',
      },
    },
    {
      contactID: 2,
      fname: 'Hieu',
      lname: 'Le',
      phone: ['604-855-999', '778-888-9991'],
      email: 'hieu.le@gmail.com',
      zipcode: 'v2t d2a',
      address: {
        street: '33058 King Road',
        city: 'Abbotsford',
        province: 'British Columbia',
        country: 'Canada',
      },
    },
    {
      contactID: 3,
      fname: 'Gurjit',
      lname: 'Singh',
      phone: ['778-123-8889', '604-848-1499'],
      email: 'gurjit@gmail.com',
      zipcode: '1q2 2t6',
      address: {
        street: '200 South Fraser Way',
        city: 'Abbotsford',
        province: 'British Columbia',
        country: 'Canada',
      },
    },
  ];
  res.status(200).json({ success: true, data: contacts });
});

// Get single contact
router.get('/:id', function (req, res) {});

// Create a contact
router.post('/', function (req, res) {});

// Update 1 contact
router.put('/:id', function (req, res) {});

// Delete a contact
router.delete('/:id', function (req, res) {});

module.exports = router;
