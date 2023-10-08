import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Define a simple route
app.get('/', (req, res) => res.send("Hello, World!"));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;