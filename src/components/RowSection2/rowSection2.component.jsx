import React, { useState, useEffect } from "react";
import "./rowSection2.styles.scss";
import axios from "../../services/axios";
import { ItemContainer } from "../layouts/ItemContainer/ItemContainer.component";

const RowSection2 = ({ title, fetchUrl, isLargeRow }) => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMoviesList(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <>
      {moviesList.length > 0 ? (
        <div className="row_container">
          <div className="row_title_container">
            <div className="row_title">{title}</div>
            <span />
          </div>
          <div className="item_container2">
            {moviesList
              .filter((item, idx) => idx < 14)
              .map((movie) => (
                <ItemContainer
                  movie={movie}
                  isLargeRow={isLargeRow}
                  handleClicks={() => null}
                />
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RowSection2;
