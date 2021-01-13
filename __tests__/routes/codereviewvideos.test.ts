import server from "../../src/server";
const request = require("supertest");

afterEach(done => {
  server.close();
  done();
});

describe("routes/codereviewvideos", () => {
  it("should allow adding a game to the list", async () => {
    const response = await request(server)
      .post("/codereviewvideos")
      .send({ game: "World of Warships" });

    expect(response.status).toEqual(201);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual({
      games: ["World of Warships"]
    });
  });
});
