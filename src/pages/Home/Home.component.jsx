import React from 'react'
import RowSection from "../../components/RowSection/rowSection.component";
import RowSection2 from "../../components/RowSection2/rowSection2.component"

import Banner from "../../components/Banner/banner.component.jsx";
import requests from "../../services/requests";

function Home(props) {

    return (
        <div >
            <Banner />
            <RowSection
                title="Trends Now"
                fetchUrl={requests.fetchTrending}
                isLargeRow
            />

            <RowSection2 title="Top Rated"
                fetchUrl={requests.fetchTopRated}
                isLargeRow
            />
            <RowSection2 title="TV Originals"
                fetchUrl={requests.fetchTVOriginals}
                isLargeRow
            />



            {/* <RowSection
                title="Watch next TV and movies"
                fetchUrl={requests.fetchTVOriginals}
            />
            <RowSection
                title="Top Rated"
                fetchUrl={requests.fetchTopRated}
            />
            <RowSection title="Action Movie" fetchUrl={requests.fetchActionMovie} />
            <RowSection title="Horror Movie" fetchUrl={requests.fetchHorrorMovie} />
            <RowSection
                title="Romance Movie"
                fetchUrl={requests.fetchRomanceMovie}
                isLargeRow
            />
            <RowSection title="Comedy Movie" fetchUrl={requests.fetchComedyMovie} /> */}

        </div>
    )
}

export default Home
