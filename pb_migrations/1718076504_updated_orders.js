/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5mxbbnycd7zw2g0")

  // remove
  collection.schema.removeField("cpyupcrn")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5mxbbnycd7zw2g0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cpyupcrn",
    "name": "clientId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "sv7p74ybk0ror5c",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
