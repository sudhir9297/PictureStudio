import React, { useState, useEffect } from 'react'
import './rowSection2.styles.scss'
import axios from '../../services/axios'
import { FiTrendingUp } from "react-icons/fi";
import { ItemContainer } from '../layouts/ItemContainer/ItemContainer.component'



const RowSection2 = ({ title, fetchUrl, isLargeRow, logo }) => {
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMoviesList(request.data.results);
            return request;
        }
        fetchData();
    }, [])


    return (
        <div className="row_container">
            <div className="row_title_container">
                <FiTrendingUp className="row_logo" size="24px" />
                <div className="row_title">{title}</div>
            </div>
            <div className="item_container2">
                {
                    moviesList.filter((item, idx) => idx < 14).map((movie) => <ItemContainer movie={movie} isLargeRow={isLargeRow} handleClicks={() => null} />)
                }
            </div>
        </div>
    )
}

export default RowSection2
