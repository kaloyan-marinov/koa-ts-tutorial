import { Context } from "koa";
import Router from "koa-router";
import { AddGameRequest } from "../request/AddGameRequest";
import { validate } from "class-validator";
import * as storage from "../storage/redis";

const router = new Router();

router.post("/codereviewvideos", async (ctx: Context) => {
  try {
    // validate the incoming request
    const validationOptions = {};

    const addGameRequest = new AddGameRequest();
    addGameRequest.name = ctx.request.body.name || "";

    const errors = await validate(addGameRequest, validationOptions);

    //   - return early if invalid
    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        data: errors
      };

      return ctx;
    }

    console.log("route storage ---", storage);

    // save the new game to storage

    // get all the games we know about

    ctx.status = 201;
    ctx.body = {
      games: [ctx.request.body.name]
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
