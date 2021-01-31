import React from 'react'
import './CustomButton.styles.scss'
import { AiOutlinePlayCircle } from "react-icons/ai";


const custom_buttons = (props) => {
    return (
        <div>
            <button className="banner_button" onClick={() => props.handlePlays()}>
                <AiOutlinePlayCircle size="26px"/>
                <div>
                {props.title}
                </div>
            </button>
        </div>
    )
}

export default custom_buttons
