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

  const routes = []
  let plan_distance = 0
  let plan_time = 0

  for (const [route_index, raw_route] of raw_plan.entries()) {
    const first_client = clients[raw_route[1] - 1]
    const first_segment_distance = distance_matrix[0][raw_route[1]]
    const first_segment_time = res.json.rows[0].elements[raw_route[1]].duration.value
    
    // $app.logger().debug(`segment 0 of route ${route_index}`,  
    //   'from (depot)', depot.get('formatted_address'),
    //   'to', first_client.formatted_address,
    //   'distance', first_segment_distance,
    //   'time', first_segment_time
    // )
    
    const route_clients = []
    const route_segments = [{
      distance: first_segment_distance,
      time: first_segment_time
    }]

    let route_distance = first_segment_distance
    let route_time = first_segment_time

    for (let w_index = 1; w_index < raw_route.length - 2; w_index++) {
      const client_from = clients[raw_route[w_index] - 1]
      const client_to = clients[raw_route[w_index + 1] - 1]
      const current_segment_distance = distance_matrix[raw_route[w_index]][raw_route[w_index + 1]]
      const current_segment_time = res.json.rows[raw_route[w_index]].elements[raw_route[w_index + 1]].duration.value

      // $app.logger().debug(`segment ${w_index} of route ${route_index}`,  
      //   'from', client_from.formatted_address, 
      //   'to', client_to.formatted_address,
      //   'distance', current_segment_distance,
      //   'time', current_segment_time
      // )

      route_clients.push(client_from)
      route_segments.push({ 
        distance: current_segment_distance,  
        time: current_segment_time
      })

      route_distance += current_segment_distance
      route_time += current_segment_time
    }

    const last_client = clients[raw_route[raw_route.length - 2] - 1]
    const last_segment_distance = distance_matrix[raw_route[raw_route.length - 2]][0]
    const last_segment_time = res.json.rows[raw_route[raw_route.length - 2]].elements[0].duration.value

    $app.logger().debug(`segment ${raw_route.length - 2} of route ${route_index}`,   
      'from', last_client.formatted_address,  
      'to (depot)', depot.get('formatted_address'),
      'distance', last_segment_distance,
      'time', last_segment_time
    )

    route_clients.push(last_client)
    route_segments.push({
      distance: last_segment_distance,
      time: last_segment_time
    })

    route_distance += last_segment_distance
    route_time += last_segment_time

    routes.push({
      route_distance,
      route_time,
      clients: route_clients,
      segments: route_segments,
    })
  }

  // const title = body.title
  // const description = body.description
  // const start = body.start
  // const user = auth_user.get('id')
  // const total_clients = body.clients.length

  return c.json(200)
});
