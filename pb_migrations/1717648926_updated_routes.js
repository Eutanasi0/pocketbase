/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mnz6ei9373v48fm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0p8ynt5l",
    "name": "vehicleId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1dmllvobelmheuw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mnz6ei9373v48fm")

  // remove
  collection.schema.removeField("0p8ynt5l")

  return dao.saveCollection(collection)
})
