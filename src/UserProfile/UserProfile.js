import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './userProfile.css';

const UserProfile = ({ user }) => {
  const [post, setPost] = useState([]);

  return (
    <div className='userBoard'>
      <div className='userInfo'>
        <img className='userIcon' src={user.photo_url} />
        <div className='user'>
          <p class='userName'>Name: {user.first_name} {user.last_name}</p>
          <Link to='/edit-profile'>
            <button className='userBtn'>Edit profile</button>
          </Link>
        </div>
      </div>

      <div className='menu'>
        <p>My Request History</p>
        <p>Help History</p>
      </div>

    </div>
  );
};

export default UserProfile;
