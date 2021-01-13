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
  });

  describe("add", () => {
    const list_name = "add_test_list";
    const name1 = "chris";

    it("should allow adding an item to a list", async () => {
      expect(await redisStorage.add(list_name, name1)).toBeTruthy();

      expect(await redisStorage.get(list_name)).toEqual([name1]);

      await redisStorage.remove(list_name, name1);
    });
  });

  describe("remove", () => {
    const list_name = "remove_test_list";

    it("should allow removing an item from a list", async () => {
      const name1 = "chris";
      const name2 = "paul";

      await redisStorage.add(list_name, name1);
      await redisStorage.add(list_name, name2);

      expect(await redisStorage.get(list_name)).toEqual([name1, name2]);

      expect(await redisStorage.remove(list_name, name1)).toBeTruthy();

      expect(await redisStorage.get(list_name)).toEqual([name2]);

      await redisStorage.remove(list_name, name2);
    });
  });
});
