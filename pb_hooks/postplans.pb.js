const collection = $app.dao().findCollectionByNameOrId("plans");

const newPlan = new Record(collection, {
    name: "wasa",
    description: "wasa description",
    start: new Date("2024-07-01"),
    estimated_end: new Date("2024-07-31"),
    userId: "ge4hxw5on7mwxz8",  
    data: { customField: "valor" }
});

$app.dao().saveRecord(newPlan)
    .then((savedRecord) => {
        console.log("guardado:", savedRecord);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
























