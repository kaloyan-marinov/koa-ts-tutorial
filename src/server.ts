import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";

const app = new Koa();

const PORT = process.env.PORT || 7654;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());

/*
Configure a router,
and associate with it a route that one will be able to send a GET request to.
*/
import Router from "koa-router";
const router = new Router();

router.get("/", async ctx => {
  try {
    ctx.body = {
      status: "success"
    };
  } catch (e) {
    console.error(e);
  }
});

app.use(router.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;
