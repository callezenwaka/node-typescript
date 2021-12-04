import express, { Application, Request, Response, NextFunction } from "express";
import { initializeApp, cert } from 'firebase-admin/app';
import cors from "cors";
import path from "path";
import fs from "fs";
const app: Application = express();
const serviceAccount = require('../service-account.json');

initializeApp({credential: cert(serviceAccount),});

import route from "./routes/route";

// setup template engine
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//  setup mddleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/fickr/feeds', require('./routes/feedRoute'));
app.use('/', route);

// app.get('/errors', async (req: Request, res: Response, next: NextFunction) => {
//   res.send(`Welcome to node-typescript!`);
// });

app.listen(5000, (): void => console.log('Server running!'));