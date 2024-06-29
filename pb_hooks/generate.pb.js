routerAdd("POST", "/generate", (c) => {
  const data = $apis.requestInfo(c).data
  const dataStr = JSON.stringify(data)
  $app.logger().debug(dataStr)
  return c.json(200)
});
