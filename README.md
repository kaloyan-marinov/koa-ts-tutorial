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
