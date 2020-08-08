import React, { useState, useEffect } from 'react'
import axios from '../../services/axios'
import requests from '../../services/requests'
import './banner.style.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

function Banner() {
    const [movie, setMovie] = useState([])
    const imgURL = 'http://image.tmdb.org/t/p/original'
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTVOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        }
        fetchData()
    }, [])

    const handlePlay=()=>{
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


    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+ "..." :str;
    }
    return (
        <div>
            <header className="banner" style={{ backgroundSize: "cover", backgroundImage: `url(${imgURL}${movie?.backdrop_path})` }}>
            <div className="banner_contents">
                <hi className="banner_title">{movie?.title || movie?.name || movie?.original_name}</hi>
                <div className="banner_buttons">
                    <button className="banner_button" onClick={()=>handlePlay(movie)}>
                        Play
                    </button>
                    <button className="banner_button">
                        MyList
                    </button>
                </div>
                <h1 className="banner_description">{truncate(movie?.overview,150)}</h1>
            </div>
            <div className="fade_bottom"/>
        </header>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Banner;
