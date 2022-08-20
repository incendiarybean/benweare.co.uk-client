import { Application, NextFunction, Request, Response } from "express";

/**
 * This is to block requests to pages that don't exist, stop API abuse
 * @param app Application - Express app to send response
 */
const routeValidator = (app: Application) => {
    const routes = ["/", "/api/news", "/api/weather", "/info", "/favicon.ico"];
    app.use((req: Request, res: Response, next: NextFunction) => {
        if (routes.includes(req.path)) {
            return next();
        }

        if (req.path.includes("/api/")) {
            return res.json({
                code: 404,
                message: `${req.method} is not defined on ${req.path}`,
            });
        }
        return next();
    });
};

export default routeValidator;
