const path = require("path");

/*--------------*/
/*    HANDLER   */
/*--------------*/

const base_route = (app: any) => {
    const indexLocation: string =
        process.env.NODE_ENV === "production"
            ? "../app/index.html"
            : "../../build/index.html";

    app.route("/")
        .get((req: any, res: any) => {
            return res.sendFile(path.join(__dirname, indexLocation));
        })
        .post((req: any, res: any) => {
            return res.json({
                code: 400,
                message: `${req.method} is not defined on ${req.path}`,
            });
        });

    app.route("*")
        .get((req: any, res: any) => {
            return res.sendFile(path.join(__dirname, indexLocation));
        })
        .post((req: any, res: any) => {
            return res.json({
                code: 400,
                message: `${req.method} is not defined on ${req.path}`,
            });
        });
};

export default base_route;
