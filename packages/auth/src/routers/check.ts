import { Elysia, t } from "elysia";

const app = new Elysia().post("/singin", ({body}) => {
  return `Hello ${body.email}!`;
},{
  body: t.Object({
    email: t.String(),
    password: t.String(),
  })
}).listen(3000);