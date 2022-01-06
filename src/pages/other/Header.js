import React from "react";
import { Link } from "react-router-dom";
import "../../assets/header.css";
const Header = () => {
  return (
    <nav className="jello-navigation">
      <Link to="/">Trello</Link>
      <div className="right-navigation">
        <Link to="/login">Login</Link>
        <Link to="/register">
          <span className="sign-up">Sign Up</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
