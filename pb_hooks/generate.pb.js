routerAdd("POST", "/generate", (c) => {
  const data = $apis.requestInfo(c)
  console.log(JSON.stringify(data))
  return c.json(200)
});
