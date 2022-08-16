const routeValidator = (app: any) => {
    const routes = [
        "/",
        "/api/pc-articles",
        "/api/weather",
        "/api/discord",
        "/info",
        "/favicon.ico",
    ];
    app.use((req: any, res: any, next: any) => {
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
