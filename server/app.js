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

server.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
