// import React 는 항상 해줘야 하는 것!
import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component{
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async() => {
    // data.data.movies 를 es6 로 나타낸 것.
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    // movies:movies 를 es6 로 나타낸 것.
    this.setState({ movies, isLoading: false });
  };
  componentDidMount(){
    this.getMovies();
  };
  render() {
    // state 에서 isLoading 을 받아와서 변수 지정
    const { isLoading, movies } = this.state;
    return (
    <section className="container">
      {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
        </div>
      )}
    </section>
    );
  };   
}

export default Home;
