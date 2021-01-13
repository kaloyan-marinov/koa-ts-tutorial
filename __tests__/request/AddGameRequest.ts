import { AddGameRequest } from "../../src/request/AddGameRequest";

describe("request/AddGameRequest", () => {
  it("has the expected class properties", async () => {
    const addGameRequest = new AddGameRequest();
    addGameRequest.name = "a game name here";

    expect(addGameRequest.name).toBeDefined();
  });
});
