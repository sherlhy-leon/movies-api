import { Request } from 'express';
import { getPopularsMovies } from '../services/movies.service';
import { CustomResponse, apiFailure, apiSuccess } from '../utils/error-handling';
import { HttpStatusCode } from 'axios';
import { MovieResponseDto } from '../dto/movies.reponse';

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