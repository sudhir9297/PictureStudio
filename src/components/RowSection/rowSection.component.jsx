import React, { useState, useEffect } from 'react'
import './rowSection.style.css'
import axios from '../../services/axios'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

function RowSection({ title, fetchUrl, isLargeRow }) {
    const imgURL = 'http://image.tmdb.org/t/p/original'
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [])

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.original_title || "")
                .then(url => {
                    console.log(url);
                    const urlParams=new URLSearchParams(new URL(url).search)
                    setTrailerUrl( urlParams.get("v"))
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    return (
        <div className="row">
            <div className="row_title">{title}</div>
            <div className="row_posters">
                {
                    movies.map((movie) => <img keys={movie.id} onClick={() => handleClick(movie)} className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${imgURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />)
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default RowSection
