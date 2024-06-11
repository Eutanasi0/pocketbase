/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mnz6ei9373v48fm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mxdsvf2e",
    "name": "estimated_total_duration",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mnz6ei9373v48fm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mxdsvf2e",
    "name": "field",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
