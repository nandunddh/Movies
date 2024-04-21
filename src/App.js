import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [popular_movies, setPopular_movies] = useState();
  const [tranding_type, setTranding_type] = useState("day");
  const [tranding, setTranding] = useState();
  useEffect(() => {
    const popular = axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=c49050f784ea27eca57ae23cf767dcac&page=1"
      )
      .then((response) => setPopular_movies(response.data.results));
    // console.log(popular_movies);

    handleTranding();
  }, [popular_movies, tranding]);

  const handleTranding = () => {
    const tranding_data = axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/${tranding_type}?api_key=c49050f784ea27eca57ae23cf767dcac&limit=10`
      )
      .then((response) => setTranding(response.data.results));
    // setTranding("day")
    console.log(tranding);
  };

  return (
    <div className="App ">
      <div className="container">
        <p>Popular Movies</p>

        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-auto">
                <p
                  className="btn btn-primary"
                  onClick={() => setTranding_type("day")}
                >
                  Day
                </p>
              </div>
              <div className="col-sm-auto">
                <p
                  className="btn btn-primary"
                  onClick={() => setTranding_type("week")}
                >
                  Week
                </p>
              </div>
            </div>
          </div>

          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                {tranding &&
                  tranding.map((movie, index) => {
                    const profile_path = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
                    return (
                      <div className="col-sm-2 my-3" key={index}>
                        <div
                          className="card border-0 m-0"
                          style={{ width: "12rem" }}
                        >
                          <img
                            src={profile_path}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body rounded rounded-top-0 py-1 border-0">
                            <h6 className="card-title">{movie.title}</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* <div className="carousel-item">
                      <img src="..." className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="..." className="d-block w-100" alt="..." />
                    </div> */}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* {popular_movies &&
            popular_movies.map((movie, index) => {
              const profile_path = `https://image.tmdb.org/t/p/w342/${movie.profile_path}`;
              return (
                <div className="col-sm-2 my-3">
                  <div className="card border-0 m-0" style={{ width: "12rem" }}>
                    <img
                      src={profile_path}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body rounded rounded-top-0 py-1 border-0">
                      <h6 className="card-title">{movie.name}</h6>
                    </div>
                  </div>
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
}

export default App;
