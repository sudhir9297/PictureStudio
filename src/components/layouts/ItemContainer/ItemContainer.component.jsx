import React from "react";
import "./ItemContainer.style.scss";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export const ItemContainer = ({ movie, isLargeRow }) => {
  const imgURL = "http://image.tmdb.org/t/p/w500";

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className="item_container">
      <Link to={`/details/${movie.id}`}>
        <div className="row_poster">
          <img
            keys={movie.id}
            className={
              `${isLargeRow}` === "undefined"
                ? "poster_image"
                : "row_posterLarge"
            }
            src={`${imgURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        </div>
        <div className="row_poster_content">
          <div className="item_name">
            {movie.name
              ? truncate(movie?.name, 15)
              : truncate(movie?.original_title, 15)}
          </div>
          <div className="item_content">
            <div className="item_date">
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </div>
            <div className="rating_container">
              <AiFillStar color="#a08c0c" size="16px" />
              <div className="rating">{movie?.vote_average}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
