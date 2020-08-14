import React, { useState, useEffect } from 'react'
import './rowSection.style.css'
import axios from '../../services/axios'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

import { FiTrendingUp } from "react-icons/fi";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ItemContainer } from '../layouts/ItemContainer/ItemContainer.component'

function RowSection({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const settings = {
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: `${isLargeRow}` === "undefined" ? 5 : 7,
        slidesToScroll: `${isLargeRow}` === "undefined" ? 5 : 7
    };

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
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get("v"))
                }).catch(err => {
                    console.log(err);
                })
        }
    }


    return (
        <div className="row">
            <div className="section_title_container">
                <FiTrendingUp className="row_logo" size="24px" />
                <div className="row_title">{title}</div>
            </div>
            <div className="row_posters">
                <Slider {...settings}>
                    {
                        movies.map((movie) => <ItemContainer movie={movie} isLargeRow={isLargeRow ? isLargeRow : undefined} handleClicks={() => handleClick(movie)} />)
                    }
                </Slider>
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default RowSection
