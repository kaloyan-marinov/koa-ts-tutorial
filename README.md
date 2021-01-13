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
