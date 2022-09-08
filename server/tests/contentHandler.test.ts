import request from "supertest";
import server from "./server.configuration";

describe("Server should server static content.", () => {
    test("Api Docs are served.", async () => {
        const result = await request(server)
            .get("/api/docs")
            .set("x-forwarded-proto", "http://test.com");
        expect(result.status).toBe(301);
    });
});
