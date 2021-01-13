import { DeleteGameRequest } from "../../src/request/DeleteGameRequest"; /* SUT := system under test */
import { validate } from "class-validator";

describe("request/DeleteGameRequest", () => {
  let deleteGameRequest: DeleteGameRequest;
  const validatorOptions = {}; /* Will not need any in this example. */

  beforeAll(() => {
    /* Run this once for all the tests under the current `describe` block. */
    deleteGameRequest = new DeleteGameRequest();
  });

  it("has the expected class properties", async () => {
    deleteGameRequest.name = "a game name here";
    expect(deleteGameRequest.name).toBeDefined();
  });

  describe(`'name' validation`, () => {
    /*
    Make sure that 20 different strings are (deemed to be) valid.
    [Strictly speaking,] they are, because there's no validation rules
    - but it's allowing us to put a string on that property and so it's a valid test.
    */
    it("is valid", async () => {
      for (let i = 1; i <= 20; ++i) {
        deleteGameRequest.name = "x".repeat(i);
        expect(
          await validate(deleteGameRequest, validatorOptions)
        ).toHaveLength(0);
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
  //   deleteGameRequest.name = 123;
  //   expect(await validate(deleteGameRequest, validatorOptions)).toHaveLength(1);
  // });

  it("must have a length of 1 character or greater", async () => {
    deleteGameRequest.name = "";
    expect(await validate(deleteGameRequest, validatorOptions)).toHaveLength(1);
  });

  it("must have a length of 20 characters of fewer", async () => {
    deleteGameRequest.name = "y".repeat(21);
    /* console.log("outcome", await validate(deleteGameRequest, validatorOptions)); */
    expect(await validate(deleteGameRequest, validatorOptions)).toHaveLength(1);
  });
});
