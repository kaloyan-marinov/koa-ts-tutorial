import * as Interfaces from "../types/interfaces";
import { config } from "../config";

const redis = require("redis"); /* Why `require` and not `import`? Simply, `import` hits on some issues with TypeScript complaining - can't tell what the reason behind that was. */
const client = redis.createClient(config.redis);

/*
[The following is] a utility provided by Node that takes an existing function
and turns it into a `Promise`-based version of that function.
*/
const { promisify } = require("util");

/*
Because we're re-defining [parts of functionality provided by the `redis` library]
[on the right hand sides of the next instructions],
we need to make sure that what this function knows as `this` is what we expect it to be;

in other words, when our `rpush`, `lrem`, or `lrange` is called against
something that we call the `client`, we need to make sure that that something is
actually the `client`.

[
For that, we can call `bin` passing in the `client`,
which will become the `this` on this newly-created function.

... has to be one of JavaScript's weirder quirks.
]
*/
const rpush = promisify(client.rpush).bind(client);
const lrem = promisify(client.lrem).bind(client);
const lrange = promisify(client.lrange).bind(client);

export const redisStorage: Interfaces.IStorage = {
  get: (list: string) => {
    return lrange(list, 0, -1)
      .then((val: string[]) => val)
      .catch((e: Error) => []);
  },
  add: (list: string, name: string) => {
    return rpush(list, name)
      .then((val: number) => val > 0)
      .catch((e: Error) => false);
  },
  remove: (list: string, name: string) => {
    return lrem(list, 0, name)
      .then((val: number) => val > 0)
      .catch((e: Error) => false);
  }
};
