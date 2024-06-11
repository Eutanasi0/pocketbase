/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxgnazhk6qelsj6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wmlvzcm8",
    "name": "total_clients",
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
    "id": "oa4ifh32",
    "name": "total_orders",
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
    "id": "59t35i2p",
    "name": "total_routes",
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
  const collection = dao.findCollectionByNameOrId("bxgnazhk6qelsj6")

  // remove
  collection.schema.removeField("wmlvzcm8")

  // remove
  collection.schema.removeField("oa4ifh32")

  // remove
  collection.schema.removeField("59t35i2p")

  return dao.saveCollection(collection)
})
