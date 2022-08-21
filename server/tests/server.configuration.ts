const {
    routeHandler,
    validatorHandler,
    headerHandler,
    contentHandler,
} = require("../handlers");

const express = require("express");
const app = express();

app.use(headerHandler);

// SET CONTENT RULES \\
contentHandler(app);

// VALIDATE ROUTE \\
validatorHandler(app);

// USE ROUTES \\
routeHandler(app);

console.log = () => {};

export default app;
