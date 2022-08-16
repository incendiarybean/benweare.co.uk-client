/*--------------*/
/*    HANDLER   */
/*--------------*/

import axios from "axios";

const news_route = (app: any) => {
    app.route("/api/pc-articles")
        .get((req: any, res: any) => {
            axios
                .get("https://www.pcgamer.com/uk/", { responseType: "json" })
                .then(async (response) => {
                    return res.send(response.data);
                });
        })
        .post((req: any, res: any) => {
            return res.json({
                code: 400,
                message: `${req.method} is not defined on ${req.path}`,
            });
        });
};

export default news_route;
