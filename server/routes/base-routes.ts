import { Application, Request, Response } from "express";
const path = require("path");

/*--------------*/
/*    HANDLER   */
/*--------------*/

const base_route = (app: Application) => {
    const indexLocation: string =
        process.env.NODE_ENV === "production"
            ? "../app/index.html"
            : "../../build/index.html";

    app.route("/")
        .get((req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname, indexLocation));
        })
        .post((req: Request, res: Response) => {
            return res.json({
                code: 400,
                message: `${req.method} is not defined on ${req.path}`,
            });
        });

    app.route("*")
        .get((req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname, indexLocation));
        })
        .post((req: Request, res: Response) => {
            return res.json({
                code: 400,
                message: `${req.method} is not defined on ${req.path}`,
            });
        });
};

export default base_route;
