const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Store memos in memory (in production, use a database)
let memos = [
  { id: 1, content: 'Welcome to the real-time memo app!', timestamp: Date.now() }
];

// Handle socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send current memos to newly connected client
  socket.emit('memos-update', memos);

  // Handle memo creation
  socket.on('create-memo', (memo) => {
    const newMemo = {
      id: Date.now(), // Simple ID generation
      content: memo.content,
      timestamp: Date.now()
    };
    memos.push(newMemo);
    // Broadcast to all clients
    io.emit('memos-update', memos);
  });

  // Handle memo update
  socket.on('update-memo', (updatedMemo) => {
    memos = memos.map(memo => 
      memo.id === updatedMemo.id ? { ...memo, content: updatedMemo.content } : memo
    );
    // Broadcast to all clients
    io.emit('memos-update', memos);
  });

  // Handle memo deletion
  socket.on('delete-memo', (memoId) => {
    memos = memos.filter(memo => memo.id !== memoId);
    // Broadcast to all clients
    io.emit('memos-update', memos);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});