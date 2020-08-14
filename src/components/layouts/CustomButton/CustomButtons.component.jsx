import React from 'react'
import './CustomButton.styles.scss'

const custom_buttons = (props) => {
    return (
        <div>
            <button className="banner_button" onClick={() => props.handlePlays}>
                {props.title}
            </button>
        </div>
    )
}

export default custom_buttons
