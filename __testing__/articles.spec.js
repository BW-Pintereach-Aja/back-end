const supertest = require("supertest");
const server = require("../index");
const db = require("../database/config");

beforeAll(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("", () => {
  it("GET / (Unauthorized)", async () => {
    const res = await supertest(server).get("/api/articles");
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: "Invalid Credentials" });
  });

  it("GET / (Unauthorized) returns message", async () => {
    const res = await supertest(server).get("/api/articles");
    expect(res.body).toEqual({ message: "Invalid Credentials" });
  });

  it("GET / (Authorized) w/Cookie", async () => {
    const res = await supertest(server)
      .get("/api/articles")
      .set("Cookie", `token=${process.env.TEST_TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(5);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });

  it("GET / (Authorized) w/Header", async () => {
    const res = await supertest(server)
      .get("/api/articles")
      .set({ Authorization: process.env.TEST_TOKEN });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(5);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });

  it("GET /api/articles/:id should return an article object", async () => {
    const res = await supertest(server)
      .get("/api/articles/1")
      .set({ Authorization: process.env.TEST_TOKEN });
    expect(res.statusCode).toBe(200);
    expect(res.body[0].articleID).toBe(1);
    expect(res.body[0].user).toBe("tiff");
    expect(res.body[0].title).toBe("CSS Something");
  });

  it("GET /api/articles/categories", async () => {
    const res = await supertest(server)
      .get("/api/articles/categories")
      .set({ Authorization: process.env.TEST_TOKEN });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
  });

  it("GET /api/articles/:id/user", async () => {
    const res = await supertest(server)
      .get("/api/articles/1/user")
      .set({ Authorization: process.env.TEST_TOKEN });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });

  it("GET /api/articles/:id/category", async () => {
    const res = await supertest(server)
      .get("/api/articles/3/category")
      .set({ Authorization: process.env.TEST_TOKEN });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("GET /api/articles/:id/category (Does not exist)", async () => {
    const res = await supertest(server)
      .get("/api/articles/335342/category")
      .set({ Authorization: process.env.TEST_TOKEN });
    console.log(res.body);
    expect(res.body.length).toBe(0);
    expect(res.statusCode).toBe(404);
  });
});
