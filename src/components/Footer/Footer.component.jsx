import React from 'react'
import './Footer.styles.scss'

const Footer = () => {
    return (
        <div className="footer_container">
            <div className="content">
                <div className="footer_items">
                    <a herf="" className="item">Terms of Services</a>
                    <a herf="" className="item">Privacy Policy</a>
                    <a herf="" className="item">About us</a>
                </div>
                <div className="logo">
                    <img className="nav_logo" src={process.env.PUBLIC_URL + '/PictureStudio.png'} alt="MovieHub Logo" />
                </div>
            </div>
            <div className="cpy_ryt">
                Copyright @ PictureStudio.All rights reserved
           </div>
        </div>
    )
}

export default Footer;