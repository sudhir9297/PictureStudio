import React from "react";
import axios from "../../services/axios";
import requests from "../../services/requests";
import "./banner.style.scss";

import { AiFillStar, AiFillCloseCircle } from "react-icons/ai";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderWrapper from "./_SlickSliderStyle";

import CustomButton from "../layouts/CustomButton/CustomButtons.component";
import LoadingAnim from "../LoadingAnimation/LoadingAnim.component";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      trailerUrl: "",
      modalPlayer: false,
      imgURL: "http://image.tmdb.org/t/p/original",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // componentDidUpdate() {
  //   const { movieList } = this.state;
  //   console.log(movieList.length);
   
  //   // if(movieList.length==0){

  //   // }
  // }

  fetchData = async () => {
    const request = await axios.get(requests.fetchTrending);

    this.setState({ movieList: request.data.results });
  };

  handlePlay = (item) => {
    const { trailerUrl } = this.state;
    if (trailerUrl) {
      this.setState({ trailerUrl: "" });
    } else {
      movieTrailer(item?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          this.setState({ trailerUrl: urlParams.get("v"), modalPlayer: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  handleClose() {
    this.setState({ trailerUrl: "", modalPlayer: false });
  }

  render() {
    const { movieList, trailerUrl, modalPlayer, imgURL } = this.state;
  
    const opts = {
      height: "700px",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      appendDots: (dots) => <ul>{dots}</ul>,
      customPaging: (i) => (
        <div className="ft-slick__dots--custom">
          <div className="loading" />
        </div>
      ),
    };

    return (
      <div>
        {movieList ? (
          <div>
            <SliderWrapper>
              <Slider {...settings}>
                {movieList
                  .filter((item, idx) => idx < 5)
                  .map((item) => (
                    <div>
                      <div
                        className="banner"
                        style={{
                          backgroundSize: "cover",
                          backgroundImage: `url(${imgURL}${item?.backdrop_path})`,
                        }}
                      >
                        <div className="banner_overlay" />
                        <div className="banner_contents">
                          <div className="content_details">
                            <AiFillStar color="#F4D204" size="16px" />
                            <div className="rating">{item?.vote_average}</div>
                            <div className="release_date">
                              Release Date : {item?.release_date}
                            </div>
                          </div>
                          <h1 className="banner_title">
                            {item?.title || item?.name || item?.original_name}
                          </h1>
                          <h1 className="banner_description">
                            {this.truncate(item?.overview, 150)}
                          </h1>
                          <CustomButton
                            title="Play Trailer"
                            handlePlays={() => this.handlePlay(item)}
                          />
                        </div>
                        <div className="fade_bottom" />
                      </div>
                    </div>
                  ))}
              </Slider>
            </SliderWrapper>
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
          </div>
        ) : (
          <LoadingAnim />
        )}
      </div>
    );
  }
}

export default Banner;
