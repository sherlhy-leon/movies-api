import { CreditsResponse } from "../model/credits.model";
import { Movie, MovieResponse } from "../model/movies.model";
import axios from 'axios';

const API_KEY = process.env.API_KEY ?? "";
const BASE_URI = process.env.MOVIE_BASE_URI ?? "";

export const getPopularsMovies = async (): Promise<Movie[]> => {
    const movieResponse: { data: MovieResponse } = await axios.get(getSignedUrl('popular'));
    return movieResponse.data.results;
}

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
    const movieResponse: { data: MovieResponse } = await axios.get(getSignedUrl('now_playing'));
    return movieResponse.data.results;
}

export const getMovieCredits = async (movieId: string): Promise<CreditsResponse> => {
    const movieResponse: { data: CreditsResponse } = await axios.get(getSignedUrl(`${movieId}/credits`));
    return movieResponse.data;
}

const getSignedUrl = (path: string) => {
    const url = new URL(path, BASE_URI);
    url.searchParams.append('api_key', API_KEY);
    return url.toString();
}