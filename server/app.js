const express = require('express');

const PORT = 3000;

const server = express();

// Set the header
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Get all contacts
server.get('/api/contacts', function (req, res) {
    const contacts = [{
        id: 1,
        fname: 'John',
        lname: 'Doe',
        phone: [123-456-7890, 122-888-9999],
        email: 'test@gmail.com',
        address: {
            streetNumber: 158,
            streetName: '12th Road',
            city: 'Surrey',
            province: 'British Columbia',
            country: 'Canada'
        },

        id: 2,
        fname: 'Hieu',
        lname: 'Le',
        phone: [604-855-999, 778-888-9991],
        email: 'hieu.le@gmail.com',
        address: {
            streetNumber: 158,
            streetName: 'King Road',
            city: 'Abbotsford',
            province: 'British Columbia',
            country: 'Canada'
        },

        id: 3,
        fname: 'Gurjit',
        lname: 'Singh',
        phone: [778-123-8889, 604-848-1499],
        email: 'gurjit@gmail.com',
        address: {
            streetNumber: 158,
            streetName: 'South Fraser Way',
            city: 'Abbotsford',
            province: 'British Columbia',
            country: 'Canada'
        },

    }]
    res.status(200).json({success: true, data: contacts})
    
  });

// Get single contact
server.get('/api/contacts/:id', function (req, res) {
    
});
  
// Create a contact
  server.post('/api/contacts', function (req, res) {
   
     
  });
  
// Update 1 contact
  server.put('/api/quotes/:id', function (req, res) {
   
  });
  
// Delete a contact
  server.delete('/api/quotes/:id', function (req, res) {
   
});



server.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
