import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Movie from "./Movie";

const deviceAdd = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
  
    const getMovies = async() => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)
      ).json();
      setMovies(json.data.movies);
      setLoading(false)
    }
  
    useEffect(() => {
      getMovies();
    },[])
    
      /* then 방법보다는, 위의 await방법을 좀 더 많이 쓴다.
      fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
        .then((response) => response.json())
        .then((json) => {
          setMovies(json.data.movies)
          setLoading(false);
        });
    }, []);
      */
  
    console.log(movies);
  
    return (
      <div>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <div>
            {movies.map((movie) => (
              <Movie
                type="movie"
                key={movie.id} //key는 React.js 에서만, map 안에서 component들을 render할 때 사용하는 것.
                id={movie.id}
                coverImage={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </div>
    ); 
};

export default deviceAdd;
