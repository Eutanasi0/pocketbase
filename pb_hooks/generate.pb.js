routerAdd('POST', '/generate', (c) => {
  const debug = (msg) => $app.logger().debug(JSON.stringify(msg))
  const generator = require(`${__hooks}/services/generator.js`)
  const api_key = require(`${__hooks}/apikey.js`)

  const body = $apis.requestInfo(c).data
  const authUser = c.get('authRecord')
  const depot_id = authUser.get('depot')

  const vehicles = $app.dao().findRecordsByFilter(
    'vehicles',
    `depot = '${depot_id}'`
  )

  const depot = $app.dao().findRecordById('depots', depot_id)

  const waypoints = [
    depot.get('formatted_address'), 
    ...body.clients.map(client => client.formatted_address)
  ]

  const URLwaypoints = waypoints.map(waypoint => 
    waypoint.replaceAll(' ', '+')
  ).join('|') 

  const matrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${URLwaypoints}&destinations=${URLwaypoints}&key=${api_key}`

  const res = $http.send({ url: matrixUrl, method: 'get' })

  const distanceMatrix = res.json.rows.map(row => 
    row.elements.map(e =>
      e.distance.value 
    )
  )

  debug(distanceMatrix)

  // const title = body.title
  // const description = body.description
  // const start = body.start
  // const user = authUser.get('id')
  // const total_clients = body.clients.length

  return c.json(200)
});
