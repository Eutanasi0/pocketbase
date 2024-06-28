routerAdd("POST", "/generate", (c) => {
  const record = c.get('authRecord')
  console.log(record)
  return c.json(200, { "message": "hola " + record.name })
});
