const { io } = require('../index');

const { connectUser, disconnectUser } = require('../controllers/socket');
const { verifyJwt } = require('../utils/jwt');

// Mensajes de Sockets
io.on('connection', (client) => {
  const [isValidToken, uid] = verifyJwt(client.handshake.headers.authorization);

  if (!isValidToken) return client.disconnect();

  connectUser(uid);

  client.on('disconnect', async () => {
    disconnectUser(uid);
  });

  //   client.on('message', (payload) => {
  //     console.log('Message', payload);
  //     io.emit('message', { admin: 'New Message' });
  //   });
});
