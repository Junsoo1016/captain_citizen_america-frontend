import React, { useState } from "react";
import './home.css';
import Map from '../Map/Map';

const Home = ({ userData }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="home">
            <div className="alertBox">
                {!clicked ? (
                    <h1 id="alert">
                        You Have <span id="amount">5</span> Captain Citizens Within 1 Mile
                    </h1>
                ) : (
                    <h1 id="emergency">Help Requested, Be Safe!</h1>
                )}
            </div>
            <div className="map">
                <Map userData={userData} />
            </div>
            <div className="btnBox">
                <button className="depth" type="button" onClick={() => setClicked(!clicked)}>
                    {!clicked ? "Emergency" : "Cancel"}
                </button>
            </div>
        </div>
    );
};

export default Home;
