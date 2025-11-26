import axios from 'axios'
import { apiKey } from '../constants/index'

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndspoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

//dynamic endpoint
const movieDetailsEndpoint = movie_id => movie_id ? `${apiBaseUrl}/movie/${movie_id}?api_key=${apiKey}` : null
const similarMovieEndpoint = movie_id => movie_id ? `${apiBaseUrl}/movie/${movie_id}/similar?api_key=${apiKey}&page=1` : null
const movieCastEndpoint = movie_id => movie_id ? `${apiBaseUrl}/movie/${movie_id}/credits?api_key=${apiKey}` : null
const personDetailsEndpoint = person_id => person_id ? `${apiBaseUrl}/person/${person_id}?api_key=${apiKey}` : null
const personMoviesEndpoint = person_id => person_id ? `${apiBaseUrl}/person/${person_id}/movie_credits?api_key=${apiKey}` : null





export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null
export const fallBackPersonImage = 'https://placehold.co/400'
const apicall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGMyNGEwZTVhMjhiNjUyMmNmYzdhNDM3Y2E5MWFjMSIsIm5iZiI6MTc2MzczMjk0MS42MzEsInN1YiI6IjY5MjA2ZGNkMzAxOTRiNGI3YzJlMzJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thBwOYAbVhA4KJfc9jqMgpovQOViDChC7VRuLaxX0UY'
        },
        params: params ? params : {}
    };
    try {
        const response = await axios.request(options)
        return response.data
    }
    catch (error) {
        console.log('error :', error)
    }
}
export const fetchTrendingMovies = () => {
    return apicall(trendingMoviesEndspoint)
}
export const fetchUpcomingMovies = () => {
    return apicall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apicall(topRatedMoviesEndpoint)
}
export const fetchMovieDetails = (movie_id) => {
    console.log('movie_id :', movie_id)
    return apicall(movieDetailsEndpoint(movie_id))
}
export const fetchSimilarMovies = (movie_id) => {
    return apicall(similarMovieEndpoint(movie_id))
}
export const fetchMovieCast = (movie_id) => {
    return apicall(movieCastEndpoint(movie_id))
}
export const fetchpersonDetails = (person_id) => {
    return apicall(personDetailsEndpoint(person_id))
}
export const fetchPersonMovies = (person_id) => {
    return apicall(personMoviesEndpoint(person_id))
}
export const fetchSearchResults =  (params) => {
    return apicall(searchMoviesEndpoint,params)
}