routerAdd("POST", "/generate", (c) => {
  console.log("hola")
  return c.json(200, { "message": "holaaa" })
});
