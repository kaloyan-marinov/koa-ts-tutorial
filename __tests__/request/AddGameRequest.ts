import { AddGameRequest } from "../../src/request/AddGameRequest"; /* SUT := system under test */
import { validate } from "class-validator";

describe("request/AddGameRequest", () => {
  let addGameRequest: AddGameRequest;
  const validatorOptions = {}; /* Will not need any in this example. */

  beforeAll(() => {
    /* Run this once for all the tests under the current `describe` block. */
    addGameRequest = new AddGameRequest();
  });

  it("has the expected class properties", async () => {
    addGameRequest.name = "a game name here";
    expect(addGameRequest.name).toBeDefined();
  });

  describe(`'name' validation`, () => {
    /*
    Make sure that 20 different strings are (deemed to be) valid.
    [Strictly speaking,] they are, because there's no validation rules
    - but it's allowing us to put a string on that property and so it's a valid test.
    */
    it("is valid", async () => {
      for (let i = 1; i <= 20; ++i) {
        addGameRequest.name = "x".repeat(i);
        expect(await validate(addGameRequest, validatorOptions)).toHaveLength(
          0
        );
      }
    });
  });

  /*
  TypeScript will pick up on [the following test] as being problematic straight away...
  we cannot assign a number to that property, even during testing ...
  TypeScript implicitly tests this for us.
  To proceed, we need to remove that test.
  */
  // it("must be a string", async () => {
  //   addGameRequest.name = 123;
  //   expect(await validate(addGameRequest, validatorOptions)).toHaveLength(1);
  // });

  it("must have a length of 1 character or greater", async () => {
    addGameRequest.name = "";
    expect(await validate(addGameRequest, validatorOptions)).toHaveLength(1);
  });

  it("must have a length of 20 characters of fewer", async () => {
    addGameRequest.name = "y".repeat(21);
    /* console.log("outcome", await validate(addGameRequest, validatorOptions)); */
    expect(await validate(addGameRequest, validatorOptions)).toHaveLength(1);
  });
});
