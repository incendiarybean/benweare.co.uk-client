import server from "./server.configuration";
const request = require("supertest");

describe("Server should accept/reject paths as defied in validatorHandler.", () => {
    test.each([
        "/api/news?outlet=notanoutlet",
        "/api/news?noquery",
        "/api/news/bbc",
        "/api/weather/today",
        "/api/weather?timeframe=weekly",
    ])("Status for %s should be 404", async (path) => {
        const result = await request(server)
            .get(path)
            .set("x-forwarded-proto", "https://test.com");
        expect(result.statusCode).toBe(404);
    });

    test.each([
        "/api/news?outlet=bbc",
        "/api/news?outlet=nasa",
        "/api/news?outlet=pc",
        "/api/weather?timeframe=today",
        "/api/weather?timeframe=week",
    ])("Status for %s should be 200", async (path) => {
        const result = await request(server)
            .get(path)
            .set("x-forwarded-proto", "https://test.com");
        expect(result.statusCode).toBe(200);
    });
});
