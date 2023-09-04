// chatRoutes.js
const express = require('express');
const router = express.Router();

// Mock array to store chat messages (replace with a database)
const chatMessages = [];

// GET chat messages
router.get('/messages', (req, res) => {
  res.json(chatMessages);
});

// POST a new chat message
router.post('/messages', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Store the new message (in-memory, replace with database storage)
  chatMessages.push({ text: message });
  res.status(201).json({ message: 'Message sent successfully' });
});

module.exports = router;
