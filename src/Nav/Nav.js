import React, { useEffect, useState } from "react";
import './nav.css'
import { FaRegUserCircle, FaRegBell, FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";


const Nav = ({user, socket, notifications, setNotifications}) => {
    const[isActive, setActive] = useState(false)


    const handleToggle = () => {
        setActive(!isActive)
      };

    const displayNotifications = () => {
        if (notifications.length > 0) {
                    <div className="notifications">
                        <p>{user.first_name} is in danger now</p>
                        <button>Navigate</button>
                    </div>
            }
        }

    return(
        <header>
            <div className="navBox">
                <div className="navLogo">
                    <img src="/images/Captain_America's_Shield.png" alt="Captain America's Shield" id="shield"/>
                    <h1 className="gradient-text">Captain Citizen America</h1>
                </div>
                <div className="toggleBtn">
                    <div>
                    <Link to="/home">
                    <FaHome id="home"/>
                    </Link>
                    </div>

                    <div className="notification">
                    <FaRegBell id="bell"/>
                    <div id="counter">1</div>
                    </div>

                    <div>
                    <Link to="/user-profile">
                    <FaRegUserCircle />
                    </Link>
                    </div>

                    {/* <div>
                        {notifications.map((n) => displayNotifications)}
                    </div> */}

                </div>
            </div>
        </header>
    )
}

export default Nav;

{/* <div className="navLinks">
    <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
</div> */}