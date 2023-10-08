import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';
import { getPopularsMoviesHandler, getNowPlayingMoviesHandler, getMovieCreditsHandler } from './src/controllers/movies.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/movies/popular', async (req: Request, res: Response) => {
    const response = await getPopularsMoviesHandler(req);
    res.header(response.headers).status(response.statusCode).json(response.body);
});

app.get('/movies/now_playing', async (req: Request, res: Response) => {
    const response = await getNowPlayingMoviesHandler(req);
    res.header(response.headers).status(response.statusCode).json(response.body);
});

app.get('/movies/:movie_id/credits', async (req: Request, res: Response) => {
    const response = await getMovieCreditsHandler(req);
    res.header(response.headers).status(response.statusCode).json(response.body);
});

// Start the server
app.listen(port, () => {
    console.log("GET /movies/popular");
    console.log("GET /movies/now_playing");
    console.log("GET /movies/:movie_id/credits");
    console.log(`Server is running on port ${port}`);
});

export default app;