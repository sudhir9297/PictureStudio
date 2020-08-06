import React, { useState, useEffect } from 'react'
import './rowSection.style.css'
import axios from '../../services/axios'

function RowSection({ title, fetchUrl,isLargeRow }) {
    const imgURL = 'http://image.tmdb.org/t/p/original'
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request
        }
        fetchData();
    }, [])

    return (
        <div className="row">
            <div>{title}</div>
            <div className="row_posters">
                {
                    movies.map((movie) => <img keys={movie.id} className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${imgURL}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />)
                }
            </div>
        </div>
    )
}

export default RowSection;
