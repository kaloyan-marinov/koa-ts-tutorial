# added after tag `video-2`

```
$ curl -X GET -v http://0.0.0.0:7654/
```

# added after tag `video-3`

```
$ curl -X GET -v http://0.0.0.0:7654/ping
```

# added after tag `video-4`

1. (Ctrl + click) on the `process` object in `src/config.ts`
2. search for `ProcessEnv`

# added after tag `video-5`

1. The convention is simply [for `__test__/`] to follow the same directory structure as we have in `src/`.

2. From the command line, issue:

```
$ npm run test
```

3. "Start Jest in watch mode" [means that] Jest will sit there and work in the background and, whenever you change any file in the paths that it's monitoring, it will re-run the test suite for you:

```
$ npm run test:watch
```

4. If you're new:
   a) to Jest, there are other videos on the site that have covered Jest in a bit more depth than this - ... take a look around;
   b) to testing in particular, why not take this as an opportunity to try and get the branch coverage of the `src/config.ts` file up to 100%?

# added after tag `video-6`

Use the Jest functionality to filter down and run one specific test:

1. go to the terminal window where Jest has been started in watch mode
2. press `w`
3. press `p`
4. type in `routes/code` and press [Enter]

---

On a new instance of the Koa `Router`, there are various methods that we can call. (You can take a look at the documentation [on https://github.com/ZijianHe/koa-router ] if you'd like to know every possible method that we can call.) But most commonly we are going to deal with the HTTP verbs (specifically: GET, POST, PUT, PATCH, and DELETE).

It's important to know that the `Router` is just another middleware in our Koa application. In Koa, pretty much everything is a middleware. This has 2 immediate implications for us:

1. We need to make sure that we export the `Router` instance, and then import it inside our app [i.e. inside`src/server.js`] and use "these routes".

2. Perhaps more importantly but certainly most confusingly, understanding how the middleware process works inside a Koa application - you can see [on https://github.com/koajs/koa/blob/master/docs/guide.md ] a documentation page which has a really nice graphic, which explains the middleware process. (You can do some really interesting things with Koa's middleware; we're doing perhaps the most basic thing that you can do.)

---

Perhaps the most confusing thing ... when ... [first starting] with Koa is how we are getting the `ctx` and why we don't need to return the `ctx` object from our middleware.

The simplistic way to think about this may be to think that (a) each [middleware] function is inside an array, (b) there's a function above this that contains that array, and (c) every function inside that array is going to be called by this top-level function, which is going to contain this `ctx` object. [Something like this:]

```
const mySimpleTopLevelMiddlewareFunction = () => {
  const myContext = { value: 0 };

  const myMiddlewareFunctions = [
    (myContext) => myContext.value += 1,
    (myContext) => myContext.value += 2,
    (myContext) => myContext.value += 3,
  ];

  myMiddlewareFunctions.forEach(mf => mf(myContext));

  console.log(myContext.value);
}

mySimpleTopLevelMiddlewareFunction();
```

# added after tag `video-9-addendum`

In order to help (or even be able to) re-run the tests, you may have to take the following step:

1. in one terminal, issue `$ docker-compose up`
2. in another terminal, issue:

```
~ $ docker ps -a
CONTAINER ID   IMAGE         COMMAND                  CREATED       STATUS         PORTS                    NAMES
370e5fcb3d91   redis:5.0.5   "docker-entrypoint.s…"   4 hours ago   Up 8 seconds   0.0.0.0:6401->6379/tcp   koa-ts-tutorial_redis_1
~ $ docker-compose exec redis /bin/sh
ERROR:
        Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml

.
.
.

koa-ts-tutorial $ docker-compose exec redis /bin/sh
# redis-cli
127.0.0.1:6379> keys *
1) "my_test_list"
2) "add_test_list"
3) "remove_test_list"

# You _may_ have to issue the following commands _more than once_:

127.0.0.1:6379> FLUSHALL
OK
127.0.0.1:6379> keys *
(empty list or set)
```
