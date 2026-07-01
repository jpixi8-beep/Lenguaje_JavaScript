const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('usuario conectado', socket.id);
  socket.on('chat message', (msg) => { io.emit('chat message', msg); });
  socket.on('disconnect', ()=> console.log('usuario desconectado', socket.id));
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, ()=> console.log(`Chat realtime en http://localhost:${PORT}`));
