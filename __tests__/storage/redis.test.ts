/*
The following important remarks about this file are in order:

- not TDD
  but is-the-prototype-working-driven tests
  
- not a true unit tests because [this unit testing] relies on Redis,
  (i.e. Redis needs to be available when [this file's] tests are run);
  but the process can be an interesting discovery exercise
*/

import { redisStorage } from "../../src/storage/redis";

describe("storage/redis", () => {
  describe("get", () => {
    it("should initially return an empty list", async () => {
      const list_name = "my_test_list";

      expect(await redisStorage.get(list_name)).toEqual([]);
      /* is equivalent to */
      // expect(redisStorage.get(list_name)).resolves.toEqual([]);
    });
  });

  xdescribe("add", () => {
    /*
    The 'x' before 'describe' prevents this test from being run.
    This is needed for the time being.
    */
  });
  xdescribe("remove", () => {
    /*
    The 'x' before 'describe' prevents this test from being run.
    This is needed for the time being.
    */
  });
});
