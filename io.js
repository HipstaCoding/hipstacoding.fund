const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

module.exports = io;