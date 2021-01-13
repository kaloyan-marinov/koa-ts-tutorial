import { Context } from "koa";
import Router from "koa-router";
import { AddGameRequest } from "../request/AddGameRequest";
import { validate } from "class-validator";
import * as storage from "../storage/redis";
import { DeleteGameRequest } from "../request/DeleteGameRequest";

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
    const rs = storage.redisStorage();
    const list_name = "my_game_list";

    await rs.add(list_name, addGameRequest.name);

    // get all the games we know about
    const allGames = await rs.get(list_name);

    ctx.status = 201;
    ctx.body = { games: allGames };
  } catch (e) {
    console.error(e);
  }
});

router.delete("/codereviewvideos", async (ctx: Context) => {
  try {
    const validatorOptions = {};

    const game = new DeleteGameRequest();
    game.name = ctx.request.body.name || "";

    const errors = await validate(game, validatorOptions);

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        data: errors
      };

      return ctx;
    }

    const list = "game_list";
    const store = storage.redisStorage();

    await store.remove(list, game.name);

    ctx.status = 200;
    ctx.body = {
      games: await store.get(list)
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;
