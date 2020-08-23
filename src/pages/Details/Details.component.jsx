import React from 'react'
import './Details.styles.scss'

function Details(props) {
    const imgURL = 'http://image.tmdb.org/t/p/original'
    const { movie } = props.location.state

    return (
        <div className="details_container" style={{ backgroundSize: "cover", backgroundImage: `url(${imgURL}${movie?.backdrop_path})` }}>
            <div className="gradient_overlay" />

        </div>
    )
}

export default Details;
