import { Movie, MovieResponse } from "../model/movies.model";
import axios from 'axios';

const API_KEY = process.env.API_KEY ?? "";
const BASE_URI = process.env.MOVIE_BASE_URI ?? "";

export const getPopularsMovies = async (): Promise<Movie[]> => {
    const url = new URL("popular", BASE_URI);
    url.searchParams.append('api_key', API_KEY);
    const movieResponse: { data: MovieResponse } = await axios.get(url.toString());
    return movieResponse.data.results;
}