import React from "react";
import './signUp.css'
import {Link} from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai';

const SignUp = ({handleSignUp},{createUser}) => {
    return(
        <div className="signUpBox">
 
            <div className="name_age">
                <input onChange={(e) => handleSignUp(e)} className="nameInput" placeholder="First name" name="first_name" />
                <input onChange={(e) => handleSignUp(e)} className="nameInput" placeholder="Last name" name="last_name" />
                <input onChange={(e) => handleSignUp(e)} className="ageInput" placeholder="Age" name="age" />
            </div>            
                <input onChange={(e) => handleSignUp(e)} placeholder="User id" name="user_id" />
                <input onChange={(e) => handleSignUp(e)} placeholder="Password" name="password" />
                <input onChange={(e) => handleSignUp(e)} placeholder="Nationality" name="nationality" />
                <input onChange={(e) => handleSignUp(e)} placeholder="Profile image" name="photo_url" />
                <input onChange={(e) => handleSignUp(e)} placeholder="Email address" name="email" />
                <input onChange={(e) => handleSignUp(e)} placeholder="Address" name="address" />

            <Link to="/">
            <button onClick={() => createUser()} className="submitBtn">Submit</button>
            </Link>

            <Link to="/">
            <button className="backBtn">
                <AiOutlineRollback />
                <p>Go back to log in page</p>
            </button>
            </Link>

        </div>
    )
}

export default SignUp