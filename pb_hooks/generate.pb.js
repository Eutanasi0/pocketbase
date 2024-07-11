routerAdd('POST', '/generate', (c) => {
  const generator = require(`${__hooks}/services/generator.js`)
  const polylines = require(`${__hooks}/services/polylines.js`)

  const api_key = require(`${__hooks}/apikey.js`)

  const body = $apis.requestInfo(c).data
  const auth_user = c.get('authRecord')
  const depot_id = auth_user.get('depot')

  const clients = body.clients
  const vehicles = body.vehicles
  const capacity = body.capacity

  const demands = [0]
  body.clients.forEach(client => 
    demands.push(
      client.products.reduce((total, curr) => (curr.amount_requested * curr.unit_weight) + total, 0)
    )
  )

  const time_windows = [[0, 24]]
  body.clients.forEach(client => 
    time_windows.push(
      client.time_window
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

  $app.logger().debug('distance/duration matrix', 'url', res)

  const distance_matrix = res.json.rows.map(row => 
    row.elements.map(e =>
      e.distance.value 
    )
  )

  const duration_matrix = res.json.rows.map(row => 
    row.elements.map(e =>
      e.duration.value / 3600
    )
  )

  $app.logger().debug('inputs', 
    'distance_matrix', distance_matrix,
    'duration_matrix', duration_matrix,
    'time_windows', time_windows,
    'vehicles', vehicles,
    'clients', clients.length,
    'demands', demands,
    'capacity', capacity
  )

  const raw_plan = generator(
    distance_matrix,
    duration_matrix,
    time_windows,
    vehicles,
    clients.length,
    demands,
    capacity
  )

  const routes = []
  let total_distance = 0
  let total_duration = 0

  for (const [route_index, raw_route] of raw_plan.entries()) {
    let route_demand = 0
    const first_client = clients[raw_route[1] - 1]

    const first_segment_distance = distance_matrix[0][raw_route[1]]
    const first_segment_duration = duration_matrix[0][raw_route[1]]
    
    // $app.logger().debug(`segment 0 of route ${route_index}`,  
    //   'from (depot)', depot.get('formatted_address'),
    //   'to', first_client.formatted_address,
    //   'distance', first_segment_distance,
    //   'duration', first_segment_duration
    // )
    
    const route_clients = []
    const route_segments = [{
      distance: first_segment_distance,
      duration: first_segment_duration
    }]

    let route_distance = first_segment_distance
    let route_duration = first_segment_duration

    for (let w_index = 1; w_index < raw_route.length - 2; w_index++) {
      const client_from = clients[raw_route[w_index] - 1]

      const client_from_demand = client_from.products.reduce((total, curr) => (curr.amount_requested * curr.unit_weight) + total, 0)
      route_demand += client_from_demand

      const client_to = clients[raw_route[w_index + 1] - 1]
      const current_segment_distance = distance_matrix[raw_route[w_index]][raw_route[w_index + 1]]
      const current_segment_duration = duration_matrix[raw_route[w_index]][raw_route[w_index + 1]]

      // $app.logger().debug(`segment ${w_index} of route ${route_index}`,  
      //   'from', client_from.formatted_address, 
      //   'to', client_to.formatted_address,
      //   'distance', current_segment_distance,
      //   'duration', current_segment_duration
      // )

      route_clients.push(client_from)
      route_segments.push({ 
        distance: current_segment_distance,  
        duration: current_segment_duration
      })

      route_distance += current_segment_distance
      route_duration += current_segment_duration
    }

    const last_client = clients[raw_route[raw_route.length - 2] - 1]

    const last_client_demand = last_client.products.reduce((total, curr) => (curr.amount_requested * curr.unit_weight) + total, 0)
    route_demand += last_client_demand

    const last_segment_distance = distance_matrix[raw_route[raw_route.length - 2]][0]
    const last_segment_duration = duration_matrix[raw_route[raw_route.length - 2]][0]

    // $app.logger().debug(`segment ${raw_route.length - 2} of route ${route_index}`,   
    //   'from', last_client.formatted_address,  
    //   'to (depot)', depot.get('formatted_address'),
    //   'distance', last_segment_distance,
    //   'duration', last_segment_duration
    // )

    route_clients.push(last_client)
    route_segments.push({
      distance: last_segment_distance,
      duration: last_segment_duration
    })

    route_distance += last_segment_distance
    route_duration += last_segment_duration

    routes.push({
      route_distance,
      route_duration,
      route_demand,
      clients: route_clients,
      segments: route_segments,
    })

    total_distance += route_distance
    total_duration += route_duration
  }

  const total_routes = routes.length
  routes.forEach((route, i) => {
    const res = polylines(
      depot.get('formatted_address'),
      depot.get('formatted_address'),
      route.clients.map(client => client.formatted_address),
      api_key
    )
    route.polyline = res.json.routes[0].polyline.encodedPolyline
    route.hue = i * (360 / total_routes)
  })

  const plan = {
    title: body.title,
    description: body.description,
    start: body.start,
    user: auth_user.get('id'),
    depot: depot,
    total_clients: clients.length,
    total_distance,
    total_duration,
    routes,
  }

  $app.logger().debug('plan', 'data', plan)

  const plans = $app.dao().findCollectionByNameOrId('plans')
  const planRecord = new Record(plans, plan)
  $app.dao().saveRecord(planRecord)

  return c.json(200, planRecord)
});
