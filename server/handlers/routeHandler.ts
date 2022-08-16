import { news_routes, base_routes } from "../routes";

const routeHandler = (app: any, server: any) => {
    news_routes(app);
    base_routes(app);
};

export default routeHandler;
