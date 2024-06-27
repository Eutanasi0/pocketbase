routerAdd("POST", "/plans", (c) => {
  const model = new DynamicModel({
    name: "",
    description: "",
    start: "",
    estimated_end: "",
    userId: "",
    data: {}
  });

  c.bind(model);


  if (!model.name || !model.start || !model.userId || !model.estimated_end || !model.data || !model.description) {
    c.noContent(400);
    return;
  }

  const newPlan = new Record("plans", {
    name: model.name,
    description: model.description,
    start: model.start,
    estimated_end: model.estimated_end,
    userId: model.userId,
    data: model.data
  });

  // Guardar el nuevo plan en la colección 'plans'
  $app.dao().saveRecord(newPlan);

  return c.json(201, { success: true, id: newPlan.id });
});







