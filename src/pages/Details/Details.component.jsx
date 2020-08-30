import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Details.styles.scss";
import keys from "../../config/keys";
import requests from "../../services/requests";

import RowSection from "../../components/RowSection/rowSection.component";

function Details(props) {
  const imgURL = "http://image.tmdb.org/t/p/original";
  const movieDbUrl = "https://api.themoviedb.org/3";

  const { movie } = props.location.state;
  const [movieDetails, setmovieDetails] = useState({});

  useEffect(async () => {
    const result = await axios(
      `${movieDbUrl}/movie/${movie.id}?api_key=${keys.tmdbApiKey}&language=en-US&append_to_response=1`
    );
    setmovieDetails(result.data);
  }, []);

  return (
    <div className="details_container">
      <div
        className="banner_container"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${imgURL}${movieDetails?.backdrop_path})`,
        }}
      >
        <div className="gradient_overlay" />
        <div className="movie_detail_container">
          <div className="movie_name">
            {movieDetails?.title || movieDetails?.original_title}
          </div>
          <div className="movie_small_detail">
            <div>IMDb {movieDetails?.vote_average}</div>
            <div>
              {parseInt(movieDetails?.runtime / 60)}h{" "}
              {parseInt(movieDetails?.runtime % 60)}min
            </div>
            <div>{movieDetails?.release_date?.split("-")[0]}</div>
          </div>
          <div className="movie_description">{movieDetails?.overview}</div>
          <div
            className="watch_trailer"
            onClick={() => console.log("watch trailer")}
          >
            Watch Trailer
          </div>
          <div className="movie_details2">
            <div className="details2_item_cont">
              <div className="details_item_name">Genres</div>
              <div className="details_item_value">
                {movieDetails?.genres?.map((el) => (
                  <div>{el.name},</div>
                ))}
              </div>
            </div>
            <div className="details2_item_cont">
              <div className="details_item_name">Tagline</div>
              <div className="details_item_value">{movieDetails?.tagline}</div>
            </div>
            <div className="details2_item_cont">
              <div className="details_item_name">Companies</div>
              <div className="details_item_value">
                {movieDetails?.production_companies?.map((el) => (
                  <div>{el.name},</div>
                ))}
              </div>
            </div>
            <div className="details2_item_cont">
              <div className="details_item_name">Countries</div>
              <div className="details_item_value">
                {movieDetails?.production_countries?.map((el) => (
                  <div>{el.name},</div>
                ))}
              </div>
            </div>
            <div className="details2_item_cont">
              <div className="details_item_name">Audio languages</div>
              <div className="details_item_value">
                {movieDetails?.spoken_languages?.map((el) => (
                  <div>{el.name},</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RowSection
        title="Similar Movies ."
        fetchUrl={`/movie/${movie.id}/similar?api_key=${keys.tmdbApiKey}&language=en-US&append_to_response=1`}
        isLargeRow
      />
    </div>
  );
}

export default Details;
