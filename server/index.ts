import { Server } from "http";

const express = require("express");
const app = express();

require("dotenv").config();

const {
    contentHandler,
    headerHandler,
    routeHandler,
    validatorHandler,
} = require("./handlers");

process.env.NODE_ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : "development";
console.log(`[${new Date()}] ENV: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV !== "development") app.use(headerHandler);

const server: Server = require("http")
    .createServer(app)
    .listen(process.env.PORT || process.env.HTTPS || 8080, (err: any) => {
        if (err) throw err;
        console.log(
            `[${new Date()}] Server is active on port: ${
                process.env.PORT || process.env.HTTPS || 8080
            }`
        );
    });

// SET CONTENT RULES \\
contentHandler(app);

// VALIDATE ROUTE \\
validatorHandler(app);

// USE ROUTES \\
routeHandler(app, server);
