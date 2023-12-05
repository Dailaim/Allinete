import { Elysia, t } from "elysia";

export const checkAuth = new Elysia().post("/singin", ({body}) => {
  return `Hello ${body.email}!`;
},{
  body: t.Object({
    email: t.String(),
    password: t.String(),
  })
})
