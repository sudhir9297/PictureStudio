import React from "react";
import "./App.css";
import RowSection from "./components/RowSection/rowSection.component.jsx";
import requests from "./services/requests";

function App() {
  return (
    <div className="App">
      <RowSection title="MOVIE ORIGINAL" fetchUrl={requests.fetchTVOriginals} isLargeRow/>
      <RowSection title="Trending Now" fetchUrl={requests.fetchTrending} />
      <RowSection title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <RowSection title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <RowSection title="Action Movie" fetchUrl={requests.fetchActionMovie} />
      <RowSection title="Romance Movie" fetchUrl={requests.fetchRomanceMovie} />
      <RowSection title="Horror Movie" fetchUrl={requests.fetchHorrorMovie} />
      <RowSection title="Comedy Movie" fetchUrl={requests.fetchComedyMovie} />
    
    </div>
  );
}

export default App;
