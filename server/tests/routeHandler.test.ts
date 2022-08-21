import server from "./server.configuration";
const request = require("supertest");

describe("Server should return expected JSON from endpoints defined in routeHandler.", () => {
    test.each([
        {
            path: "/api/news?outlet=bbc",
            keys: ["title", "link", "img", "date", "site"],
        },
        {
            path: "/api/news?outlet=nasa",
            keys: [
                "copyright",
                "date",
                "explanation",
                "hdurl",
                "media_type",
                "service_version",
                "title",
                "url",
            ],
        },
        {
            path: "/api/news?outlet=pc",
            keys: ["title", "link", "img", "date", "site"],
        },
        { path: "/api/weather?timeframe=today", keys: ["day", "location"] },
        { path: "/api/weather?timeframe=week", keys: ["days", "location"] },
    ])(
        "Expected $path to return an object with keys that match $keys",
        async ({ path, keys }) => {
            const result = await request(server)
                .get(path)
                .set("x-forwarded-proto", "https://test.com");
            expect(
                Array.isArray(result.body)
                    ? Object.keys(result.body[0])
                    : Object.keys(result.body)
            ).toEqual(keys);
        }
    );
});
