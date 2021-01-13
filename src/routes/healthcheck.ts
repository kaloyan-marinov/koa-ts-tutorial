/*
This module serves to quickly monitor
whether the backend API is up and running.
*/

/*
Configure a router,
and associate with it a route that one will be able to send a GET request to.
*/
import Router from "koa-router";
const router = new Router();

router.get("/ping", async ctx => {
  try {
    ctx.body = {
      status: "success",
      data: "pong"
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
