//  frontend/src/pages/Chat.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socketIo = io('http://localhost:3001');
    setSocket(socketIo);

    // Register the user with their username when they connect
    socketIo.emit('register_user', 'User1');  // Replace 'User1' with the actual logged-in username

    socketIo.on('receive_message', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!recipient || !message) {
      alert('Please specify both recipient and message.');
      return;
    }

    const messageData = {
      sender: 'User1',  // Replace with actual username
      recipient: recipient,
      content: message,
    };

    socket.emit('send_message', messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      
      {/* Display chat messages */}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Input for recipient and message */}
      <div>
        <input
          type="text"
          placeholder="Recipient Username"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <textarea
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;