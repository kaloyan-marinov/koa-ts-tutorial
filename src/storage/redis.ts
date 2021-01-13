interface IStorage {
  /*
  Think about this in a more abstract fashion:
  think about all kinds of storages,
  and how Redis would be one of those storages that implements this particular
  interface.

  The truth is this is a trial-and-error process that requires quite a lot of thought.
  */
  get: (list_name: string) => string[];
  add: (list_name: string, item: string) => boolean;
  remove: (list_name: string, item: string) => boolean;
}

export const redisStorage: IStorage = {
  get: (list_name: string) => [],
  add: (list_name: string, item: string) => false,
  remove: (list_name: string, item: string) => false
};
