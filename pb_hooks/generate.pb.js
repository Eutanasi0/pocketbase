routerAdd("POST", "/generate", (c) => {
  const debug = (msg) => $app.logger().debug(JSON.stringify(msg))

  const planInput = $apis.requestInfo(c).data
  const authUser = c.get('authRecord')
  const depotId = authUser.get('depot')

  const vehicles = $app.dao().findRecordsByFilter(
    "vehicles",
    `depot = "${depotId}"`
  )

  debug(vehicles)

  return c.json(200)
});
