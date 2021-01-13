import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

router.post("/codereviewvideos", async (ctx: Context) => {
  try {
    ctx.status = 201;
    ctx.body = {
      games: ["World of Warships"]
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
