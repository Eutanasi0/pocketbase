routerAdd("POST", "/generate", (c) => {
  const data = $apis.requestInfo(c).data
  console.log(data)
  return c.json(200)
});
