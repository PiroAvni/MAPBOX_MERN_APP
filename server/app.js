import express from 'express';
import cors  from "cors";
// import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import {logger} from"./middleware/logger.js";
import  officeRouter  from"./routes/officeRouter.js";
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(morgan);
app.use(logger);


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});


app.use(express.json({ limit: "10mb" }));

// Routes
app.use('/office', officeRouter);
app.use('/user', userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Server!!" });
});
app.get((req, res) => {
  res.status(404).json({ success:false, message: "Not Found!" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
