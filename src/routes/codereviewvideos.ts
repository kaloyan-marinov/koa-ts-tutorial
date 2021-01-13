import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

router.post("/codereviewvideos", async (ctx: Context) => {
  try {
    ctx.status = 201;
    ctx.body = {
      games: [ctx.request.body.game]
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
