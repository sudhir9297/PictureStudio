import React, { useState, useEffect } from 'react'
import axios from '../../services/axios'
import requests from '../../services/requests'
import './banner.style.css'

import { AiFillStar } from "react-icons/ai";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderWrapper from "./_SlickSliderStyle";

import CustomButton from '../layouts/CustomButton/CustomButtons.component'


import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'



function Banner() {
    const imgURL = 'http://image.tmdb.org/t/p/original'
    const [movieList, setMovieList] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovieList(request.data.results);
        }
        fetchData()
    }, [])

    const handlePlay = (item) => {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(item?.original_title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get("v"))
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        appendDots: dots => <ul>{dots}</ul>,
        customPaging: i => (
            <div className="ft-slick__dots--custom">
                <div className="loading" />
            </div>
        )
    };


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div>
            <SliderWrapper>
                <Slider {...settings}>
                    {
                        movieList.filter((item, idx) => idx < 5).map((item) => <div>
                            <div className="banner" style={{ backgroundSize: "cover", backgroundImage: `url(${imgURL}${item?.backdrop_path})` }}>
                                <div className="banner_overlay" />
                                <div className="banner_contents">
                                    <div className="content_details">
                                        <AiFillStar color="#F4D204" size="16px" />
                                        <div className="rating">{item?.vote_average}</div>
                                        <div className="release_date">Release Date : {item?.release_date}</div>
                                    </div>
                                    <h1 className="banner_title">{item?.title || item?.name || item?.original_name}</h1>
                                    <h1 className="banner_description">{truncate(item?.overview, 150)}</h1>
                                    <div className="banner_buttons">
                                        <CustomButton title="Play" handlePlays={() => handlePlay(item)} />
                                        <CustomButton title="MyList" handlePlays={() => null} />
                                    </div>
                                </div>
                                <div className="fade_bottom" />
                            </div>
                        </div>

                        )
                    }
                </Slider>
            </SliderWrapper>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div >
    )
}

export default Banner;
