import React, { useState } from "react";
import RegistrationForm from "./register";
import LoginForm from "./login";
import WelcomePage from "./welcomePage";
import "./App.css";

const App = () => {
  // State to manage user authentication status and username
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Function to handle user registration
  const handleRegister = async (userData) => {
    try {
      // send request to db
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Registration successful
        console.log("Registration successful");
        setLoggedIn(true);
        setUsername(userData.username);
      } else {
        // Registration failed
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Function to handle user login
  
  const handleLogin = async (userData) => {
    try {
      // Send login data to backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if response is successful (status code 200)
      if (response.ok) {
        // Retrieve user data from response
        const data = await response.json();

        // Update state to indicate user is logged in
        setLoggedIn(true);
        setUsername(data.user.username);

      } else {
        // Login failed, display error message
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    
    console.log("Logging out user");
    
    setLoggedIn(false);
    setUsername("");
  };

  // State to manage whether to show registration or login form
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Function to switch between registration and login forms
  const switchForm = () => {
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
  };

  return (
    <div className="container">
      {loggedIn ? (
      <>
          <WelcomePage username={username} />
          <button className="button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div className="wrapper">
          {!showLoginForm ? (
            <RegistrationForm onRegister={handleRegister} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
          {showLoginForm && (
            <div className="link">
              <p>
                Do not have an account?{" "}
                <span onClick={switchForm}>Register</span>
              
              </p>
            </div>
          )}
          {!showLoginForm && (
            <div className="link">
              <p>
                Already have an account?{" "}
                
                <span onClick={switchForm}>Login</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
