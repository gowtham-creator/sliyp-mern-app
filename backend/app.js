const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const http = require("http"); // Import the 'http' module
const socketIo = require("socket.io"); // Import 'socket.io'
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const chatRoutes = require('./routes/chatRoutes'); // Update the path


app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

const server = http.createServer(app); // Create an HTTP server using 'app'

// Create a WebSocket server using 'socket.io' and attach it to the HTTP server
const io = socketIo(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Chat Server is running on http://localhost:3001');
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/chat', chatRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
