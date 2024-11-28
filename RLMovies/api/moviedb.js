import axios from 'axios';
import { apiKey } from '../constants';

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3/';
const trendingMoviesEndpoint = `${apiBaseUrl}trending/movie/day?language=pt-br&api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}movie/upcoming?language=pt-br&api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}movie/top_rated?language=pt-br&api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}search/movie?language=pt-br&api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}movie/${id}?language=pt-br&api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}movie/${id}/credits?language=pt-br&api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}movie/${id}/similar?language=pt-br&api_key=${apiKey}`;

const personDetailsEndpoint = id => `${apiBaseUrl}person/${id}?language=pt-br&api_key=${apiKey}`;
const personMoviesEndpoint = id => `${apiBaseUrl}person/${id}/movie_credits?language=pt-br&api_key=${apiKey}`;

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {}
    }
}

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id));
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params);
}