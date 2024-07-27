import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const port = 8000;
app.use(express.static(path.resolve('./public')));

const server = http.createServer(app);
const io = new Server(server);

// socket io
io.on('connection', (socket) => {
  socket.on('user-message', (message) => {
    io.emit('message', message);
  });
});

// routes:
app.get('/', (req, res) => {
  return res.sendFile('/public/index.html');
});

server.listen(port, () => {
  console.log(`server stared at http://localhost:${port}`);
});
