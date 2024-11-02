import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="header">
      <div className="brand">Book Exchange</div>
      <form onSubmit={handleSearchSubmit} className="searchForm">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="searchInput"
        />
        <button type="submit" className="searchButton">
          🔍
        </button>
      </form>
      <div className="profile">
        <a href="/profile" className="profileLink">Profile</a>
      </div>
    </header>
  );
};

export default Header;