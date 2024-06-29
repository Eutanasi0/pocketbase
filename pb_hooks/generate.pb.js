routerAdd("POST", "/generate", (c) => {
  const data = $apis.requestInfo(c).data
  console.log(JSON.toString(data))
  $app.logger().info(JSON.toString(data))
  return c.json(200)
});
