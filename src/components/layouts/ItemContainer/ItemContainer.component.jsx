import React from 'react'
import './ItemContainer.style.scss'
import { AiFillStar } from "react-icons/ai";


export const ItemContainer = ({ movie, isLargeRow, handleClicks }) => {
    const imgURL = 'http://image.tmdb.org/t/p/w500'
    return (
        <div className="item_container">
            <div className="row_poster" onClick={handleClicks}>
                <img keys={movie.id} className={`${isLargeRow}` === "undefined" ? "poster_image" : "row_posterLarge"} src={`${imgURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
            </div>
            <div className="row_poster_content">
                <div className="item_name">
                    {movie?.title || movie?.original_title}
                </div>
                <div className="item_content">
                    <div className="item_date">
                        {movie?.release_date}
                    </div>
                    <div className="rating_container">
                        <AiFillStar color="#F4D204" size="16px" />
                        <div className="rating">{movie?.vote_average}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
