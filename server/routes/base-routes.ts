import { Application, Request, Response } from "express";
const path = require("path");

/*--------------*/
/*    HANDLER   */
/*--------------*/

const base_route = (app: Application) => {
    const index = `${process.env.APP_PATH}/index.html`;

    app.route("/")
        .get((req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname, index));
        })
        .post((req: Request, res: Response) => {
            return res.json({
                code: 400,
                message: `${req.method} is not defined on ${req.path}`,
            });
        });

    app.route("*")
        .get((req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname, index));
        })
        .post((req: Request, res: Response) => {
            return res.json({
                code: 400,
                message: `${req.method} is not defined on ${req.path}`,
            });
        });
};

export default base_route;
