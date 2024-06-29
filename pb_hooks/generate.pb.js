routerAdd('POST', '/generate', (c) => {
  const debug = (msg) => $app.logger().debug(JSON.stringify(msg))

  const body = $apis.requestInfo(c).data
  const authUser = c.get('authRecord')
  const depot = authUser.get('depot')

  const vehicles = $app.dao().findRecordsByFilter(
    'vehicles',
    `depot = '${depot}'`
  )

  const addresses = body.clients.map(client => 
    client.formatted_address.replaceAll(' ', '+')
  ).join('|') 

  // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?
  //   &origins=${addresses}
  //   &destinations=${addresses}
  //   &key=${API_KEY}`

  debug($os.getenv('APIKEY'))

  // const title = body.title
  // const description = body.description
  // const start = body.start
  // const user = authUser.get('id')
  // const total_clients = body.clients.length

  return c.json(200)
});
