import express = require("express");
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';
import config from "./config/config";
import logging from './config/logging';
import mongoose, { mongo } from 'mongoose';
import controller from './controllers/will';
import willJob from './jobs/will';
import will from "./jobs/will";

const NAMESPACE = 'app';

// Create a new express app instance
const app: express.Application = express();

app.use(express.json()); //Used to parse JSON bodies

logging.info(NAMESPACE, config.mongo.url)
/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });
mongoose.set('debug', true);

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })

    next();
});



app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.post('/will', controller.createWill)
app.get('/will', controller.getAllWills)
app.get('/will/:wallet', controller.getTestatorWills)
app.get('/balance/:wallet', controller.getWalletBalance)

app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});


setInterval(willJob, 5000)