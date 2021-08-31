// import React 는 항상 해줘야 하는 것!
import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

/* function 컴포넌트는 return 함수를 가진다.
function App{
  return <h1> I like Potato </h1>;
}
*/

/* class 컴포넌트는 return 함수를 가지지 않고, render 함수를 가진다.
React 는 자동으로 클래스 컴포넌트의 render 함수를 실행한다!
class 컴포넌트 안에서 state 오브젝트를 사용할 수 있다.
*/
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

  /* 기초 알기
  state = {
    count: 0
  };
  add = () => {
    console.log("add");
    // state를 바꾸고 싶을 때,
    this.state.count = 1 을 한다면, 바뀌지 않는다.
    대신, setState 함수를 호출하면, React 는 언제 어떻게 바꿔야 할 지 알아듣고 행동함!
    //
    this.setState(current => ({count: current.count + 1}));
  }
  minus = () => {
    console.log("minus");
    // this.setState({count: this.state.count - 1}) 보다 나은 방법
    this.setState(current => ({count: current.count - 1}));
  }
  render() {
    return (
      // div 로 감싸주지 않으면 에러가 남!
      <div>
        <h1>The number is: {this.state.count}</h1>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    );
  }
  */
}

export default Home;
