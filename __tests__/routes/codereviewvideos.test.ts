import { executionAsyncId } from "async_hooks";
import server from "../../src/server";
const request = require("supertest");

afterEach(done => {
  server.close();
  done();
});

describe("routes/codereviewvideos", () => {
  const games = ["World of Warships", "Battlefield"];

  games.forEach((game: string) => {
    it(`should allow adding a game to the list - ${game}`, async () => {
      const response = await request(server)
        .post("/codereviewvideos")
        .send({ name: game });

      expect(response.status).toEqual(201);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual({
        games: [game]
      });
    });
  });

  it("should keep track of all games added to the list", async () => {
    const data1 = { name: "Half Life 3" };
    const response1 = await request(server)
      .post("/codereviewvideos")
      .send(data1);

    expect(response1.status).toEqual(201);
    expect(response1.type).toEqual("application/json");
    expect(response1.body).toEqual({
      games: [data1.name]
    });

    const data2 = { name: "Grand Theft Auto" };
    const response2 = await request(server)
      .post("/codereviewvideos")
      .send(data2);

    expect(response2.status).toEqual(201);
    expect(response2.type).toEqual("application/json");
    expect(response2.body).toEqual({
      games: [data1.name, data2.name]
    });
  });

  it("should return a validation failure if the game data is incorrect", async () => {
    const response = await request(server)
      .post("/codereviewvideos")
      .send({ name: "" });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual({
      status: "error",
      data: [
        {
          target: { name: "" },
          value: "",
          property: "name",
          children: [],
          constraints: {
            length: "name must be longer than or equal to 1 characters"
          }
        }
      ]
    });
  });
});
