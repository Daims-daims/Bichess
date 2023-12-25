import express, { Request, Response } from "express";
const path = require('path');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, '../../client/dist')))

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});