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
  /*
  Whilst the following constant is going to be available to all our tests,
  under the hood Redis is going to be re-using this list per test.
  
  So what this is means is
  each of the tests is going to rely on the previous test
  - and that is NOT GOOD.

  This then raises a bunch of questions as to how you would effectively test this.
  [The tutorial author's] personal approach would probably be towards integration
  testing (so testing this sort of "a layer above" unit tests), but it's really hard to
  say generically how to test this or indeed if you even should...
  that's why testing is such a difficult subject beyond just learning the syntax.
  */
  // const list_name = "my_test_list";

  describe("get", () => {
    const list_name = "get_test_list";

    it("should initially return an empty list", async () => {
      expect(await redisStorage.get(list_name)).toEqual([]);
      /* is equivalent to */
      // expect(redisStorage.get(list_name)).resolves.toEqual([]);
    });

    xit("should return all items in a list", async () => {
      expect(await redisStorage.get(list_name)).toEqual([]);
      /* is equivalent to */
      // expect(redisStorage.get(list_name)).resolves.toEqual([]);
    });
  });

  describe("add", () => {
    const list_name = "add_test_list";

    it("should allow adding an item to a list", async () => {
      expect(await redisStorage.add(list_name, "chris")).toBeTruthy();

      expect(await redisStorage.get(list_name)).toEqual(["chris"]);
    });
  });
  xdescribe("remove", () => {
    /*
    The 'x' before 'describe' prevents this test from being run.
    This is needed for the time being.
    */
  });
});
