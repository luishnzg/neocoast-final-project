import instance from './index';

export default () => instance.get('users');

/* const getMovies = () => {return (instance.get('/discover/movie'))};
const getMovieDetails = (movie_id) => {return (instance.get(`/movie/${movie_id}`))};

export { getMovies, getMovieDetails }; */
