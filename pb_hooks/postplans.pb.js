

routerAdd("POST", "/plans", (c) => {
  const model = new DynamicModel({
    title: "",
    description: "",
    startDate: "",
    clients: []
  });

  c.bind(model);

  // Validar los campos obligatorios
  if (!model.title || !model.startDate || !model.clients || !model.description) {
    c.noContent(400);
    return;
  }

  // Transformar los datos de los clientes para ajustarlos al modelo esperado
  const transformedClients = model.clients.map(client => ({
    id: client.id,
    description: client.description,
    products: client.products.map(product => ({
      id: product.id,
      name: product.name,
      amount_requested: product.amount_requested
    }))
  }));

  // Crear un nuevo registro para la colección 'plans'
  const newPlan = new Record("plans", {
    title: model.title,
    description: model.description,
    startDate: model.startDate,
    clients: transformedClients
  });

  // Guardar el nuevo plan en la colección 'plans'
  $app.dao().saveRecord(newPlan);

  return c.json(201, { success: true, id: newPlan.id });
});


















