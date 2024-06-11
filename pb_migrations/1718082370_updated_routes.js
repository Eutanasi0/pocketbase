/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mnz6ei9373v48fm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fvg9pd2u",
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
    "id": "fnnmvga2",
    "name": "total_distance",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mnz6ei9373v48fm")

  // remove
  collection.schema.removeField("fvg9pd2u")

  // remove
  collection.schema.removeField("fnnmvga2")

  // remove
  collection.schema.removeField("mxdsvf2e")

  return dao.saveCollection(collection)
})
