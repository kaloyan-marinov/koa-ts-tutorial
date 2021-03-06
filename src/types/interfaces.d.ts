export interface IConfig {
  port: string;
  redis: {
    host: string;
    port: number;
  };
}

export interface IStorage {
  /*
  Think about this in a more abstract fashion:
  think about all kinds of storages,
  and how Redis would be one of those storages that implements this particular
  interface.

  The truth is this is a trial-and-error process that requires quite a lot of thought.
  */
  get: (list_name: string) => Promise<string[]>;
  add: (list_name: string, item: string) => Promise<boolean>;
  remove: (list_name: string, item: string) => Promise<boolean>;
}
