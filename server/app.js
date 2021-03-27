// Import packages
const express = require('express');
const cors = require('cors');

// Import modules
const contacts = require('./routes/contacts');

const PORT = 3000;

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/api/contacts', contacts);

server.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
