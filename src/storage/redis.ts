import * as Interfaces from "../types/interfaces";
import { config } from "../config";

const redis = require("redis"); /* Why `require` and not `import`? Simply, `import` hits on some issues with TypeScript complaining - can't tell what the reason behind that was. */
const client = redis.createClient(config.redis);

export const redisStorage: Interfaces.IStorage = {
  get: (list_name: string) => [],
  add: (list_name: string, item: string) => false,
  remove: (list_name: string, item: string) => false
};
