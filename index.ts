import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';
import { getPopularsMoviesHandler } from './src/controllers/movies.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/movies/populars', async (req: Request, res: Response) => {
    const response = await getPopularsMoviesHandler(req);
    res.header(response.headers).status(response.statusCode).json(response.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;