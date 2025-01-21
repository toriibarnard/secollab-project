// frontend/src/pages/Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';  // import useNavigate from react-router-dom
import './Dashboard.css'; // import the stylesheet

const Dashboard = () => {
  const navigate = useNavigate();  // initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // remove token from localStorage
    navigate('/login');  // redirect to login page using useNavigate
  };

  const goToChat = () => {
    navigate('/chat');  // navigate to the chat page
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="content">
        <div className="card">
          <h3>Your Tasks</h3>
          <ul>
            <li>Task 1: Complete design mockup</li>
            <li>Task 2: Review PRs</li>
            <li>Task 3: Plan sprint meeting</li>
          </ul>
        </div>
        
        <div className="card">
          <h3>Recent Messages</h3>
          <ul>
            <li>John Doe: "Can you review my PR?"</li>
            <li>Jane Smith: "Meeting tomorrow at 2 PM"</li>
            <li>Mark Lee: "Send over the updated requirements"</li>
          </ul>
        </div>

        {/* Add a button to navigate to the chat page */}
        <button onClick={goToChat} className="chat-button">
          Go to Chat
        </button>
      </div>
    </div>
  );
};

export default Dashboard;