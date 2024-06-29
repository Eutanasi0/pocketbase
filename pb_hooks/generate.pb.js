routerAdd("POST", "/generate", (c) => {


  const planInput = $apis.requestInfo(c).data
  const authUser = c.get('authRecord')

  // const vehicles = $app.dao().findRecordsByFilter(
  //   "vehicles",
  //   `depot = "${authUser.depot}`
  // )

  $app.logger().debug(authUser.depot)

  return c.json(200)
});
