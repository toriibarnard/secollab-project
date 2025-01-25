//  frontend/src/pages/Chat.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';  // import axios for making API calls
import io from 'socket.io-client';  // Importing the Socket.IO client

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('User1');  // Hardcoded for now, replace with real username
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);  // Will hold the list of users from the backend
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the list of users from the backend
    axios.get('http://localhost:3001/api/users')
      .then(response => {
        setUserList(response.data);  // Update the userList with the data from the backend
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });

    const socketIo = io('http://localhost:3001');
    setSocket(socketIo);

    // Register the user with their username when they connect
    socketIo.emit('register_user', username);

    socketIo.on('receive_message', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    if (!recipient || !message) {
      alert('Please specify both recipient and message.');
      return;
    }

    const messageData = {
      sender: username,
      recipient: recipient,
      content: message,
    };

    socket.emit('send_message', messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage('');
  };

  const filteredUsers = userList.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) && user.username !== username
  );

  const handleUserClick = (user) => {
    setRecipient(user.username);  // Set the selected user as the chat recipient
    setMessages([]);  // Clear any previous messages when starting a new chat
  };

  return (
    <div>
      <h2>Chat</h2>
      
      {/* Search for users */}
      <div>
        <input
          type="text"
          placeholder="Search for a user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display the list of users */}
      <div>
        <h3>Users</h3>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.username} onClick={() => handleUserClick(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat interface for the selected user */}
      {recipient && (
        <div>
          <h3>Chat with {recipient}</h3>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>

          <div>
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      {/* If no recipient is selected, display a prompt */}
      {!recipient && <p>Select a user to start chatting!</p>}
    </div>
  );
};

export default Chat;