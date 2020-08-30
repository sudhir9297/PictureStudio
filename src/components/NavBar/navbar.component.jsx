import React, { useEffect, useState } from "react";
import "./navbar.style.scss";
import { FiSearch, FiChevronDown } from "react-icons/fi";

import { Link } from "react-router-dom";

function Navbar() {
  const [show, handleShow] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        console.log("hi");
      });
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="left_side">
        <img
          className="nav_logo"
          src={process.env.PUBLIC_URL + "/PictureStudio.png"}
          alt="MovieHub Logo"
        />
      </div>
      <div className="right_side">
        <div className="nav_option">
          <Link to="/" className="options">
            Home
          </Link>
          <Link to="/movies" className="options">
            Movies
          </Link>
          <Link to="/series" className="options">
            Series
          </Link>
          <Link to="/mylist" className="options">
            Mylist{" "}
            <FiChevronDown
              style={{ marginLeft: "8px" }}
              size="22px"
              onClick={null}
            />
          </Link>
          <Link className="options">
            <FiSearch size="22px" onClick={null} />
          </Link>
        </div>
        <img
          className="nav_avatar"
          src={process.env.PUBLIC_URL + "/avatar_logo.jpg"}
          alt="avatar Logo"
        />
      </div>
    </div>
  );
}

export default Navbar;
