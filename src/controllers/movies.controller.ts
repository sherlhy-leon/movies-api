import { Request } from 'express';
import { getMovieCredits, getNowPlayingMovies, getPopularsMovies } from '../services/movies.service';
import { CustomResponse, apiFailure, apiSuccess } from '../utils/error-handling';
import { HttpStatusCode } from 'axios';
import { MovieResponseDto } from '../dto/movies.reponse';
import { CreditsResponseDto } from '../dto/credits.response';

const context = "MoviesController";

export const getPopularsMoviesHandler = async (req: Request): Promise<CustomResponse<MovieResponseDto>> => {
    try {
        const movies = await getPopularsMovies();
        return apiSuccess<MovieResponseDto>(HttpStatusCode.Ok, { movies });
    } catch (error) {
        console.error(`${context} Failed: ${JSON.stringify(error, null, 5)}`);
        return apiFailure(error as Error);
    }
};

export const getNowPlayingMoviesHandler = async (req: Request): Promise<CustomResponse<MovieResponseDto>> => {
    try {
        const movies = await getNowPlayingMovies();
        return apiSuccess<MovieResponseDto>(HttpStatusCode.Ok, { movies });
    } catch (error) {
        console.error(`${context} Failed: ${JSON.stringify(error, null, 5)}`);
        return apiFailure(error as Error);
    }
};

export const getMovieCreditsHandler = async (req: Request): Promise<CustomResponse<CreditsResponseDto>> => {
    try {
        const credits = await getMovieCredits(req.params.movie_id);
        return apiSuccess<CreditsResponseDto>(HttpStatusCode.Ok, { credits });
    } catch (error) {
        console.error(`${context} Failed: ${JSON.stringify(error, null, 5)}`);
        return apiFailure(error as Error);
    }
};