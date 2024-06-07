/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxgnazhk6qelsj6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d2lu6fbs",
    "name": "userId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bxgnazhk6qelsj6")

  // remove
  collection.schema.removeField("d2lu6fbs")

  return dao.saveCollection(collection)
})
