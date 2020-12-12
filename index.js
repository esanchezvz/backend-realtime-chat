const express = require('express');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// App de Express
const app = express();

// Middlewares
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Routes
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Ocurrió un error. Intenta nuevamente.',
  });
});

server.listen(process.env.PORT, async (err) => {
  if (err) throw new Error(err);

  await dbConnection();
  console.log('Server listening on port ', process.env.PORT);
});
