import keys from "../config/keys";

const request = {
  fetchTrending: `/trending/all/day?api_key=${keys.tmdbApiKey}`,
  fetchTVOriginals: `/discover/movie?api_key=${keys.tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
  fetchTopRated: `/movie/top_rated?api_key=${keys.tmdbApiKey}&language=en-US&page=1`,
  fetchActionMovie: `/discover/movie?api_key=${keys.tmdbApiKey}&with_genres=28`,
  fetchComedyMovie: `/discover/movie?api_key=${keys.tmdbApiKey}&with_genres=35`,
  fetchHorrorMovie: `/discover/movie?api_key=${keys.tmdbApiKey}&with_genres=27`,
  fetchRomanceMovie: `/discover/movie?api_key=${keys.tmdbApiKey}&with_genres=10749`,
};

export default request;
