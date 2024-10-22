import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import './Login.css';
import './SignUp.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); 
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleClick = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.");
            return;
        }

        setPasswordError(""); 

        const newUser = {
            username,
            email,
            password
        };

        axios.post('http://localhost:3000/users', newUser)
            .then((response) => {
                alert('Registration successful!');
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                alert('Error during registration.');
            });
    };

    return (
        <div className="container">
            <div className="register-container">
                <center>
                    <h1 className="register-header">Register</h1>
                    <form onSubmit={handleClick} className="register-form">
                        <div className="register-fields">
                            <label className="register-label" htmlFor="username">Username:</label><br />
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="register-input"
                                placeholder="Enter your username"
                                required
                            /><br />

                            <label className="register-label" htmlFor="email">Email:</label><br />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="register-input"
                                placeholder="Enter your email"
                                required
                            /><br />

                            <label className="register-label" htmlFor="password">Password:</label><br />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="register-input"
                                placeholder="Enter your password"
                                required
                            /><br />

                            <label className="register-label" htmlFor="confirmPassword">Confirm Password:</label><br />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="register-input"
                                placeholder="Confirm your password"
                                required
                            /><br />

                            {passwordError && <p className="error-text">{passwordError}</p>}

                            <button type="submit" className="register-button">Register</button>
                        </div>
                    </form>
                    <p className="login-text">Already have an account?</p>
                    <button className="login-button" onClick={handleLogin}>Login here!</button>
                </center>
            </div>
        </div>
    );
}

export default Register;
