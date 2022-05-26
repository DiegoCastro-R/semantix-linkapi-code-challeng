import "express-async-errors";
import "../database/mongo";

import { AppRouter } from './routes'
import cors from "cors";
import express from "express";
import fs from 'fs'
import path from 'path'

require('dotenv').config();


const dir = path.join(__dirname, '../../../temp');

try {
    // first check if directory already exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log("Temp directory is created.");
    }
} catch (err) {
    console.log(err);
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(AppRouter);




export { app }