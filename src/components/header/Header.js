import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();

    const navigateToHome = (e) => {
        navigate("/");
    }

    return (
        <header className="header">
            <div className="brand" onClick={navigateToHome}>Book Exchange</div>
            <div className="right-section">
                <div className="search">
                    <a href="/search" className="headerLink">Search</a>
                </div>
                <div className="addBook">
                    <a href="/create-book-entry" className="headerLink">Add Book</a>
                </div>
                <div className="profile">
                    <a href="/profile" className="headerLink">Profile</a>
                </div>
            </div>
        </header>

    );
};

export default Header;