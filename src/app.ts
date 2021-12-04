import express, { Application, Request, Response, NextFunction } from "express";
// import { Request, Response, NextFunction } from "express";
import { initializeApp, cert } from 'firebase-admin/app';
import cors from "cors";
import path from "path";
const app: Application = express();
const serviceAccount = require('../service-account.json');

initializeApp({credential: cert(serviceAccount),});

import route from "./routes";

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

// notfound error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const message: Error = new Error('Not found');
  // const status: number = 404;
  const error: {message: string, status: number} = {
    message: message.message,
    status: 404
  };
  next(error);
})

// error handler
app.use((error: { status: number; message?: string; }, req: Request, res: Response, next: NextFunction) => {
  // console.log(error);
  // res.status(error.status || 500);
  error = {
    message: error.message,
    status: error.status || 500
  };
  res.json(error);
});

app.listen(5000, (): void => console.log('Server running!'));