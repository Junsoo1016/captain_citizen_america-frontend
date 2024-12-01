import React from 'react';
import { Link } from 'react-router-dom';
import './userProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-board">
      {/* 사용자 정보 섹션 */}
      <div className="user-info">
        <img
          className="user-icon"
          src={user.photo_url}
          alt={`${user.first_name}'s profile`}
        />
        <div className="user-details">
          <p className="user-name">Name: {user.first_name} {user.last_name}</p>
          <Link to="/edit-profile">
            <button className="user-btn">Edit Profile</button>
          </Link>
        </div>
      </div>

      {/* 메뉴 섹션 */}
      <div className="menu">
        <p className="menu-item">My Request History</p>
        <p className="menu-item">Help History</p>
      </div>
    </div>
  );
};

export default UserProfile;
