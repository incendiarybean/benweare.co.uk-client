import server from "./server.configuration";
const request = require("supertest");

describe("Server should redirect to HTTPS when HTTP is used", () => {
    test("Status code matches the redirect", async () => {
        const result = await request(server)
            .get("/")
            .set("x-forwarded-proto", "http://test.com");
        expect(result.status).toBe(301);
    });
});
