import React, { useState, useEffect } from 'react'
import axios from '../../services/axios'
import requests from '../../services/requests'
import './banner.style.css'


function Banner() {
    const [movie, setMovie] = useState([])
    const imgURL = 'http://image.tmdb.org/t/p/original'

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTVOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        }
        fetchData()
    }, [])


    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+ "..." :str;
    }
    return (
        <header className="banner" style={{ backgroundSize: "cover", backgroundImage: `url(${imgURL}${movie?.backdrop_path})` }}>
            <div className="banner_contents">
                <hi className="banner_title">{movie?.title || movie?.name || movie?.original_name}</hi>
                <div className="banner_buttons">
                    <button className="banner_button">
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
    )
}

export default Banner;
