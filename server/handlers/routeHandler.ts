import { Application } from "express";
import { news_routes, base_routes, weather_routes } from "../routes";

const routeHandler = (app: Application) => {
    news_routes(app);
    weather_routes(app);
    base_routes(app);
};

export default routeHandler;
