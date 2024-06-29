routerAdd('POST', '/generate', (c) => {
  const debug = (msg) => $app.logger().debug(JSON.stringify(msg))
  const generator = require(`${__hooks}/services/generator.js`)
  const api_key = require(`${__hooks}/apikey.js`)

  const body = $apis.requestInfo(c).data
  const auth_user = c.get('authRecord')
  const depot_id = auth_user.get('depot')

  const vehicles = $app.dao().findRecordsByFilter(
    'vehicles',
    `depot = '${depot_id}'`
  )

  const clients = body.clients

  const demands = body.clients.map(client => (
    client.products.reduce((total, curr) => (curr.amount_requested * curr.unit_weight) + total, 0)
  ))

  const depot = $app.dao().findRecordById('depots', depot_id)

  const waypoints = [
    depot.get('formatted_address'), 
    ...clients.map(client => client.formatted_address)
  ]

  const url_waypoints = waypoints.map(waypoint => 
    waypoint.replaceAll(' ', '+')
  ).join('|') 

  const matrix_url = `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${url_waypoints}&destinations=${url_waypoints}&key=${api_key}`

  const res = $http.send({ url: matrix_url, method: 'get' })

  const distance_matrix = res.json.rows.map(row => 
    row.elements.map(e =>
      e.distance.value 
    )
  )

  // const raw_routes = generator(
  //   distance_matrix,
  //   vehicles.length,
  //   clients.length,
  //   demands,
  //   vehicles[0].get('capacity')
  // )

  $app.logger().debug('arguments',
    'matrix', JSON.stringify(distance_matrix),
    'vehicles', vehicles.length,
    'clients', clients.length,
    'demands', JSON.stringify(demands),
    'capacity', vehicles[0].get('capacity')
  )

  // const title = body.title
  // const description = body.description
  // const start = body.start
  // const user = auth_user.get('id')
  // const total_clients = body.clients.length

  return c.json(200)
});
