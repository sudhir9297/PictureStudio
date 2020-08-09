import React, { useState, useEffect } from 'react'
import axios from '../../services/axios'
import requests from '../../services/requests'
import './banner.style.css'

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

function Banner() {
    const imgURL = 'http://image.tmdb.org/t/p/original'
    const [movieList, setMovieList] = useState([])
    const [value, setValue] = useState(0)
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request2 = await axios.get(requests.fetchTVOriginals);
            setMovieList(request2.data.results);
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
        autoplay: true
    };


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    function onChange(value) {
        setValue(value)
    }

    return (
        <div>
            {/* <Slider {...settings}>
                {
                    movieList.filter((item, idx) => idx < 5).map((item) => <header className="banner" style={{ backgroundSize: "cover", backgroundImage: `url(${imgURL}${item?.backdrop_path})` }}>
                        <img className="backgroundImage" key={item.id} src={`${imgURL}${item?.backdrop_path}`} />
                        <div className="banner_contents">
                            <hi className="banner_title">{item?.title || item?.name || item?.original_name}</hi>
                            <div className="banner_buttons">
                                <button className="banner_button" onClick={() => handlePlay(item)}>
                                    Play
                        </button>
                                <button className="banner_button">
                                    MyList
                        </button>
                            </div>
                            <h1 className="banner_description">{truncate(item?.overview, 150)}</h1>
                        </div>
                        <div className="fade_bottom" />
                    </header>)
                }
            </Slider> */}
            <Carousel autoPlay={4000}
                animationSpeed={1000}
                infinite
                onChange={onChange}
            >
                {
                    movieList.filter((item, idx) => idx < 5).map((item) => <header className="banner" style={{ backgroundSize: "cover", backgroundImage: `url(${imgURL}${item?.backdrop_path})` }}>
                        <div className="banner_contents">
                            <hi className="banner_title">{item?.title || item?.name || item?.original_name}</hi>
                            <div className="banner_buttons">
                                <button className="banner_button" onClick={() => handlePlay(item)}>
                                    Play
                        </button>
                                <button className="banner_button">
                                    MyList
                        </button>
                            </div>
                            <h1 className="banner_description">{truncate(item?.overview, 150)}</h1>
                        </div>
                        <div className="fade_bottom" />
                    </header>)
                }
            </Carousel>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Banner;
