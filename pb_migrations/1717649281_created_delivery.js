/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i4mmr5phgrqvpby",
    "created": "2024-06-06 04:48:01.822Z",
    "updated": "2024-06-06 04:48:01.822Z",
    "name": "delivery",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "owmssrss",
        "name": "orderId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "5mxbbnycd7zw2g0",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "rjypphln",
        "name": "routeId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "mnz6ei9373v48fm",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i4mmr5phgrqvpby");

  return dao.deleteCollection(collection);
})
