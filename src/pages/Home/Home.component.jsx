import React from 'react'

import RowSection from "../../components/RowSection/rowSection.component";
import Banner from "../../components/Banner/banner.component.jsx";
import requests from "../../services/requests";

function Home() {
    return (
        <div>
            <Banner />
            <RowSection
                title="Watch next TV and movies"
                fetchUrl={requests.fetchTVOriginals}
            />
            <RowSection title="Trending Now" fetchUrl={requests.fetchTrending} />
            <RowSection
                title="Top Rated"
                fetchUrl={requests.fetchTopRated}
                isLargeRow
            />
            <RowSection title="Action Movie" fetchUrl={requests.fetchActionMovie} />
            <RowSection title="Horror Movie" fetchUrl={requests.fetchHorrorMovie} />
            <RowSection
                title="Romance Movie"
                fetchUrl={requests.fetchRomanceMovie}
                isLargeRow
            />
            <RowSection title="Comedy Movie" fetchUrl={requests.fetchComedyMovie} />
        </div>
    )
}

export default Home
