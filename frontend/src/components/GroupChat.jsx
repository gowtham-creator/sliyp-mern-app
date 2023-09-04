import React, { useState, useEffect } from 'react';
import api from '../api'; // Import your API configuration

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Load initial chat messages from your API when the component mounts
    loadChatMessages();
  }, []);

  const loadChatMessages = () => {
    // Make a GET request to fetch chat messages from your API
    api.get('/chat/messages')
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch chat messages:', error);
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== '') {
      // Send the message to the server via your API
      api.post('/chat/messages', { message: messageInput })
          .then(() => {
            // After sending the message, reload chat messages
            loadChatMessages();
            setMessageInput('');
          })
          .catch((error) => {
            console.error('Failed to send chat message:', error);
          });
    }
  };

  return (
      <div>
        <div>
          <ul>
            {messages.map((message, index) => (
                <li key={index}>{message.text}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
  );
};

export default GroupChat;
