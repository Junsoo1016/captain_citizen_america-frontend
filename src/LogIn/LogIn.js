import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const Login = ({ handleLogin, setLogin }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleLogin({ name, value });
    };

    const showNav = () => {
        setLogin(true);
    };

    return (
        <div className="loginBox">
            <div className="loginLogo">
                <img
                    src="/images/Captain_America's_Shield.png"
                    alt="Captain America's Shield"
                    id="login_shield"
                />
                <h1 id="login_gradient-text">Captain Citizen America</h1>
            </div>

            <input
                onChange={handleInputChange}
                placeholder="User ID"
                name="user_id"
                aria-label="User ID"
            />
            <input
                onChange={handleInputChange}
                placeholder="Password"
                name="password"
                type="password"
                aria-label="Password"
            />

            <Link to="/home" className="linkBtn">
                <button className="loginBtn" onClick={showNav}>
                    Log In
                </button>
            </Link>

            <Link to="/sign-up" className="linkBtn">
                <button className="newAccountBtn">Sign Up</button>
            </Link>

            <button className="howToUse">
                <AiOutlineQuestionCircle />
                How to use
            </button>
        </div>
    );
};

export default Login;
