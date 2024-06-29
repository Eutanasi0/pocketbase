const debug = (input) => $app.logger().debug(JSON.stringify(input))

routerAdd("POST", "/generate", (c) => {
  const planInput = $apis.requestInfo(c).data
  const authUser = c.get('authRecord')

  const vehicles = $app.dao().findRecordsByFilter(
    "vehicles",
    `depot = "${authUser.depot}`
  )

  debug(vehicles)

  return c.json(200)
});
