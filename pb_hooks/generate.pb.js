routerAdd("POST", "/generate", (c) => {
  const planInput = $apis.requestInfo(c).data
  const authUser = c.get('authRecord')
  const depotId = authUser.get('depot')

  const vehicles = $app.dao().findRecordsByFilter(
    "vehicles",
    `depot = "${depotId}"`
  )

  $app.logger().debug(JSON.stringify(vehicles))

  return c.json(200)
});
