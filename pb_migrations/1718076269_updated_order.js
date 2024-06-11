/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5mxbbnycd7zw2g0")

  collection.name = "orders"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5mxbbnycd7zw2g0")

  collection.name = "order"

  return dao.saveCollection(collection)
})
