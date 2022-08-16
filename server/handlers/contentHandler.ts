const cors = require("cors"),
    express = require("express"),
    path = require("path");

const routeContent = (app: any) => {
    console.log(`[${new Date()}] Configuring CORS...`);

    const indexLocation: string =
        process.env.NODE_ENV === "production" ? "../app" : "../../build";

    app.use(
        cors({
            origin:
                process.env.NODE_ENV !== "development"
                    ? "https://benweare.co.uk"
                    : "*",
            methods: "GET,HEAD",
        })
    );
    app.use(express.json());
    app.use(express.static(path.join(__dirname, indexLocation)));
    app.use(
        "/favicon.ico",
        express.static(path.join(__dirname, `${indexLocation}/favicon.ico`))
    );
};

export default routeContent;
