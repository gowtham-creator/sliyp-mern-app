import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import api from '../api'; // Import your API configuration

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const socket = io('http://localhost:5000'); // Replace with your server URL

    useEffect(() => {
        // Listen for incoming chat messages via WebSocket
        socket.on('chat message', (message) => {
            setMessages([...messages, message]);
        });

        return () => {
            // Disconnect the WebSocket when the component unmounts
            socket.disconnect();
        };
    }, [messages, socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageInput.trim() !== '') {
            // Send the message to the server via WebSocket
            socket.emit('chat message', messageInput);

            // Clear the input field
            setMessageInput('');
        }
    };

    return (
        <div>
            <div>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
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

export default Chat;
