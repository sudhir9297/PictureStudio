import React, { useEffect, useState } from "react";
import "./navbar.style.scss";

import {Link} from 'react-router-dom'

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
      <Link to="/">
        <img
            className="nav_logo"
            src={process.env.PUBLIC_URL + "/PictureStudio.png"}
            alt="MovieHub Logo"
          />
      </Link>
        
    </div>
  );
}

export default Navbar;
