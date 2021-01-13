import { executionAsyncId } from "async_hooks";
import server from "../../src/server";
/*
[The next instruction is] more common in TypeScript land
rather than "the destructuring route" that you tend to see on "regular JavaScript"
projects.
*/
import * as storage from "../../src/storage/redis";
const request = require("supertest");

/*
If you run this test alone, the output from the next instruction demonstrates that
`storage` is an instance of `redisStorage`
- in other words, at this stage it isn't a mock.

[Examining the log further, we] can also see that
our system is trying to directly connect to Redis, which isn't great.
(
It's useful to understand why that is:
if we take a look at our Redis implementation,
one of the really interesting things about this is that
we have defined a couple of constants outside the thing that we are "exporting"
- we've got `redis` and we've also got `client`,
and what this is going to try and do is actually spin up our connection to Redis;
it doesn't really matter that we're in a test...
and this is something we can't have if we're going to mock this.
)
*/
// console.log("[before jest.mock] storage ---", storage);

/*
[If the previous instruction are replaced with the next block,]
two interesting things happen:

1. we get a mock instead of the actual implementation
2. [our system still tries] to connect to Redis
*/
jest.mock("../../src/storage/redis");
console.log("[after jest.mock] storage ---", storage);

afterEach(done => {
  server.close();
  done();
});

describe("routes/codereviewvideos", () => {
  const games = ["World of Warships", "Battlefield"];

  describe("post", () => {
    games.forEach((game: string) => {
      it(`should allow adding a game to the list - ${game}`, async () => {
        const mockGet = jest.fn((list: string) => Promise.resolve([game]));

        storage.redisStorage = jest.fn(() => {
          return {
            get: mockGet,
            add: (list: string) => Promise.resolve(false),
            remove: (list: string) => Promise.resolve(false)
          };
        });

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
      const list_of_games: string[] = [];
      const mockGet = jest.fn((list: string) => Promise.resolve(list_of_games));
      const mockAdd = jest.fn((list: string, name: string) => {
        list_of_games.push(name);
        return list_of_games.length > 0;
      });

      storage.redisStorage = jest.fn(() => {
        return {
          get: mockGet,
          add: mockAdd,
          remove: (list: string) => Promise.resolve(false)
        };
      });

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

  describe("delete", () => {
    it("returns an empty list when the list is empy", async () => {
      const game = "Overwatch";

      const list_of_games: string[] = [game];

      const mockGet = jest.fn((list: string) => Promise.resolve(list_of_games));
      const mockAdd = jest.fn();
      const mockRemove = jest.fn((list: string, game: string) => {
        const index = list_of_games.indexOf(game);
        if (index === -1) {
          return false;
        }
        list_of_games.splice(index, 1);
        return true;
      });

      storage.redisStorage = jest.fn(() => {
        return {
          get: mockGet,
          add: mockAdd,
          remove: mockRemove
        };
      });

      const response = await request(server)
        .delete("/codereviewvideos")
        .send({ name: game });

      expect(response.status).toEqual(204);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual({
        games: [game]
      });

      expect(mockGet).toHaveBeenCalled();
      expect(mockRemove).toHaveBeenCalled();
      expect(mockAdd).not.toHaveBeenCalled();
    });
  });
});
