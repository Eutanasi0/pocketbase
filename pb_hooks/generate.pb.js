routerAdd('POST', '/generate', (c) => {
  const debug = (msg) => $app.logger().debug(JSON.stringify(msg))
  const generator = require(`${__hooks}/services/generator.js`)
  const api_key = require(`${__hooks}/apikey.js`)

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

  const matrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${addresses}&destinations=${addresses}&key=${api_key}`

  const res = $http.send({ url: matrixUrl, method: 'get' })

  // const distanceMatrix = res.rows.map(row => 
  //   row.elements.map(e =>
  //     e.distance.value 
  //   )
  // )

  debug(res.json.rows)

  // const title = body.title
  // const description = body.description
  // const start = body.start
  // const user = authUser.get('id')
  // const total_clients = body.clients.length

  return c.json(200)
});
