import React, { useEffect, useState } from 'react'
import './navbar.style.css'

function Navbar() {

    const [show, handleShow] = useState([])

    useEffect(() => {
        window.addEventListener('scroll', () => {
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
            <img className="nav_logo" src={process.env.PUBLIC_URL + '/PictureStudio.png'} alt="MovieHub Logo" />
            <img className="nav_avatar" src={process.env.PUBLIC_URL + '/avatar_logo.jpg'} alt="avatar Logo" />
        </div>
    )
}

export default Navbar;
