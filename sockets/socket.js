const { io } = require('../index');

const {
  connectUser,
  disconnectUser,
  saveMessage,
} = require('../controllers/socket');
const { verifyJwt } = require('../utils/jwt');

// Mensajes de Sockets
io.on('connection', (client) => {
  const [isValidToken, uid] = verifyJwt(client.handshake.headers.authorization);

  if (!isValidToken) return client.disconnect();

  connectUser(uid);

  // Create private socket channel for user
  client.join(uid);
  client.on('message-sent', async (payload) => {
    try {
      await saveMessage(payload);
      // Emit message to receiver privatly
      io.to(payload.to).emit('message-sent', payload);
    } catch (error) {
      console.error(error);
    }
  });

  client.on('disconnect', async () => {
    disconnectUser(uid);
  });

  //   client.on('message', (payload) => {
  //     console.log('Message', payload);
  //     io.emit('message', { admin: 'New Message' });
  //   });
});
