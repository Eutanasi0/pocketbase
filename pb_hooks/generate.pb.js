routerAdd('POST', '/generate', (c) => {
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

  const demands = [0]
  body.clients.forEach(client => 
    demands.push(
      client.products.reduce((total, curr) => (curr.amount_requested * curr.unit_weight) + total, 0)
    )
  )

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

  $app.logger().debug('distance/time matrix', 'url', res)

  const distance_matrix = res.json.rows.map(row => 
    row.elements.map(e =>
      e.distance.value 
    )
  )

  $app.logger().debug('distance matrix', 'data', distance_matrix)

  const raw_plan = generator(
    distance_matrix,
    vehicles[0].get('instances'),
    clients.length,
    demands,
    vehicles[0].get('capacity')
  )

  for (const [route_index, raw_route] of raw_plan.entries()) {
    $app.logger().debug(`waypoint 0 of route ${route_index}`,  
      'from (depot)', depot.get('formatted_address'),
      'to', clients[raw_route[1] - 1].formatted_address,
      'distance', distance_matrix[0][raw_route[1]],
      'time', res.json.rows[0].elements[raw_route[1]].duration.value
    )
    for (let w_index = 1; w_index < raw_route.length - 2; w_index++) {
      $app.logger().debug(`waypoint ${w_index} of route ${route_index}`,  
        'from', clients[raw_route[w_index] - 1].formatted_address, 
        'to', clients[raw_route[w_index + 1] - 1].formatted_address,
        'distance', distance_matrix[raw_route[w_index]][raw_route[w_index + 1]],
        'time', res.json.rows[raw_route[w_index]].elements[raw_route[w_index + 1]].duration.value
      )
    }
    $app.logger().debug(`waypoint ${raw_route.length - 2} of route ${route_index}`,   
      'from', clients[raw_route[raw_route.length - 2] - 1].formatted_address,  
      'to (depot)', depot.get('formatted_address'),
      'distance', distance_matrix[raw_route[raw_route.length - 2]][0],
      'time', res.json.rows[raw_route[raw_route.length - 2]].elements[0].duration.value
    )
  }

  // const title = body.title
  // const description = body.description
  // const start = body.start
  // const user = auth_user.get('id')
  // const total_clients = body.clients.length

  return c.json(200)
});
