import React from "react";
import axios from "axios";
import "./Details.styles.scss";
import keys from "../../config/keys";

import RowSection from "../../components/RowSection2/rowSection2.component";

import CustomButton from "../../components/layouts/CustomButton/CustomButtons.component";
import { AiFillCloseCircle } from "react-icons/ai";

import LoadingAnim from "../../components/LoadingAnimation/LoadingAnim.component";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      trailerUrl: "",
      modalPlayer: false,
      movieDbUrl: "https://api.themoviedb.org/3",
      imgURL: "http://image.tmdb.org/t/p/original",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(props, prev) {
    if (props.match.params.id !== this.props.match.params.id) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { movieDbUrl } = this.state;
    const result = await axios(
      `${movieDbUrl}/movie/${this.props.match.params.id}?api_key=${keys.tmdbApiKey}&language=en-US&append_to_response=1`
    );
    this.setState({ movieDetails: result.data });
  };

  handlePlay = (item) => {
    const { trailerUrl } = this.state;
    if (trailerUrl) {
      this.setState({ trailerUrl: "" });
    } else {
      movieTrailer(item?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          this.setState({ modalPlayer: true, trailerUrl: urlParams.get("v") });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleClose = () => {
    this.setState({ modalPlayer: false, trailerUrl: "" });
  };

  render() {
    const { movieDetails, trailerUrl, modalPlayer, imgURL } = this.state;

    const opts = {
      height: "700px",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <>
        {Object.entries(movieDetails).length > 0 ? (
          <div className="details_container">
            <div
              className="banner_container"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${imgURL}${movieDetails?.backdrop_path})`,
              }}
            >
              <div className="gradient_overlay" />
              <div className="movie_detail_container">
                <div className="movie_name">
                  {movieDetails?.title || movieDetails?.original_title}
                </div>
                <div className="movie_small_detail">
                  <div>IMDb {movieDetails?.vote_average}</div>
                  <div>
                    {parseInt(movieDetails?.runtime / 60)}h{" "}
                    {parseInt(movieDetails?.runtime % 60)}min
                  </div>
                  <div>{movieDetails?.release_date?.split("-")[0]}</div>
                </div>
                <div className="movie_description">
                  {movieDetails?.overview}
                </div>
                <CustomButton
                  title="Watch Trailer"
                  handlePlays={() => this.handlePlay(movieDetails)}
                />

                <div className="movie_details2">
                  <div className="details2_item_cont">
                    <div className="details_item_name">Genres</div>
                    <div className="details_item_value">
                      {movieDetails?.genres?.map((el) => (
                        <div>{el.name},</div>
                      ))}
                    </div>
                  </div>
                  <div className="details2_item_cont">
                    <div className="details_item_name">Tagline</div>
                    <div className="details_item_value">
                      {movieDetails?.tagline}
                    </div>
                  </div>
                  <div className="details2_item_cont">
                    <div className="details_item_name">Companies</div>
                    <div className="details_item_value">
                      {movieDetails?.production_companies?.map((el) => (
                        <div>{el.name},</div>
                      ))}
                    </div>
                  </div>
                  <div className="details2_item_cont">
                    <div className="details_item_name">Countries</div>
                    <div className="details_item_value">
                      {movieDetails?.production_countries?.map((el) => (
                        <div>{el.name},</div>
                      ))}
                    </div>
                  </div>
                  <div className="details2_item_cont">
                    <div className="details_item_name">Audio languages</div>
                    <div className="details_item_value">
                      {movieDetails?.spoken_languages?.map((el) => (
                        <div>{el.name},</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {modalPlayer ? (
              <div className="modal_player">
                <div>
                  <AiFillCloseCircle
                    size="26px"
                    color="#F4D204"
                    style={{
                      float: "right",
                      margin: " 8px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => this.handleClose()}
                  />
                </div>
                <div>
                  {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                </div>
              </div>
            ) : null}

            <RowSection
              title="Similar Movies ."
              fetchUrl={`/movie/${this.props.match.params.id}/similar?api_key=${keys.tmdbApiKey}&language=en-US&append_to_response=1`}
              isLargeRow
            />
          </div>
        ) : (
          <LoadingAnim />
        )}
      </>
    );
  }
}

export default Details;
