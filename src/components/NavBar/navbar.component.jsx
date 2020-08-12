import React, { useEffect, useState } from 'react'
import './navbar.style.css'
import { FiSearch, FiChevronDown } from "react-icons/fi";

function Navbar() {

    const [show, handleShow] = useState([])

    useEffect(() => {
        window.addEventListener('scroll', () => {
            console.log(window.scrollY)
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false)
            }
        });
        return () => {
            window.removeEventListener('scroll');
        }
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className="left_side">
                <img className="nav_logo" src={process.env.PUBLIC_URL + '/PictureStudio.png'} alt="MovieHub Logo" />
            </div>
            <div className="right_side">
                <div className="nav_option">
                    <div className="options">Home</div>
                    <div className="options">Movies</div>
                    <div className="options">Series</div>
                    <div className="options">Mylist  <FiChevronDown style={{ marginLeft: "8px" }} size="22px" onClick={null} /></div>
                    <div><FiSearch size="22px" onClick={null} /></div>
                </div>
                <img className="nav_avatar" src={process.env.PUBLIC_URL + '/avatar_logo.jpg'} alt="avatar Logo" />
            </div>
        </div>
    )
}

export default Navbar;
