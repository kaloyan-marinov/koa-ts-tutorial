import * as Interfaces from "../types/interfaces";

export const redisStorage: Interfaces.IStorage = {
  get: (list_name: string) => [],
  add: (list_name: string, item: string) => false,
  remove: (list_name: string, item: string) => false
};
