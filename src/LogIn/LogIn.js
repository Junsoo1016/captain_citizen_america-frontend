import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const Login = ({handleLogin, setLogin}) => {
 
  console.log(setLogin)

  const showNav = () => {
    console.log('clicked');
    setLogin(true)
  }
   

  return (
      <div className='loginBox'>

        <div className="loginLogo">
            <img src="/images/Captain_America's_Shield.png" alt="Captain America's Shield" id="login_shield"/>
            <h1 id="login_gradient-text">Captain Citizen America</h1>
        </div>

        <input
          onChange={(e) => handleLogin(e)}
          placeholder='User id'
          name='user_id'
        />
        <input
          onChange={(e) => handleLogin(e)}
          placeholder='Password'
          name='password'
        />

        <Link to='/home' className='linkBtn'>
          <button className='loginBtn' onClick={showNav} > Log In </button>
        </Link>

        <Link to='/sign-up' className='linkBtn'>
          <button className='newAccountBtn'> Sign Up </button>
        </Link>

        <button className="howToUse">
          <AiOutlineQuestionCircle />
          <p>How to use</p>
        </button>
      </div>
  );
};

export default Login;