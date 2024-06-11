/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s18sufx4rdvu4v3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lbdvjq3w",
    "name": "distance",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qfawvdot",
    "name": "polyline",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4vq2hf7r",
    "name": "estimated_duration",
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
  const collection = dao.findCollectionByNameOrId("s18sufx4rdvu4v3")

  // remove
  collection.schema.removeField("lbdvjq3w")

  // remove
  collection.schema.removeField("qfawvdot")

  // remove
  collection.schema.removeField("4vq2hf7r")

  return dao.saveCollection(collection)
})
