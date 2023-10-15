import React from 'react';
import { useOutletContext } from 'react-router-dom';

import MovieList from 'Components/MovieList';
import moviesData from 'Data/movies';

import './styles.scss';

const Home = () => {
  const [favorites, setFavorites] = useOutletContext();

  return (
    <div className="home">
      <MovieList
        movies={moviesData}
        setFavorites={setFavorites}
        favorites={favorites}
      />
    </div>
  );
};

export default Home;
