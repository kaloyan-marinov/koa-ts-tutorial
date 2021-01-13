import { AddGameRequest } from "../../src/request/AddGameRequest";

describe("request/AddGameRequest", () => {
  let addGameRequest: AddGameRequest;

  beforeAll(() => {
    addGameRequest = new AddGameRequest();
  });

  it("has the expected class properties", async () => {
    addGameRequest.name = "a game name here";
    expect(addGameRequest.name).toBeDefined();
  });
});
