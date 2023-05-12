import express from 'express';
import bodyParse from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';

const app = express();

// Middleware
app.use(bodyParse.json({ limit: '30mb', extended: true })); // enable the middleware on our express server
app.use(bodyParse.urlencoded({ limit: '30mb', extended: true })); // enable the middleware on our express server
app.use(cors());

dotenv.config();

// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

mongoose
    .connect(process.env.MONGO_DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log('Listening at port ' + process.env.PORT)))
    .catch((error) => console.log(error));

// usage of routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);

// console.log("This is a test "+ pm.response.text()); to see response
