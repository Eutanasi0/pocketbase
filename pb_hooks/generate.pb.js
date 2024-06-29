routerAdd("POST", "/generate", (c) => {
  const data = $apis.requestInfo(c).data
  
  const authRecord = c.get('authRecord')

  $app.logger().debug(JSON.stringify(authRecord))
  return c.json(200)
});
