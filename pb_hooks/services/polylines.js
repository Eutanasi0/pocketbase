module.exports = (origin, destination, intermediates, apikey) => {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
  const res = $http.send({
    url,
    method: 'post',
    body: JSON.stringify({
      origin: { address: origin },
      destination: { address: destination },
      intermediates: intermediates.map(intermediate => ({ address: intermediate })),
      travelMode: 'DRIVE',
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apikey,
      'X-Goog-FieldMask': 'routes.polyline'
    }
  })
  return res
}