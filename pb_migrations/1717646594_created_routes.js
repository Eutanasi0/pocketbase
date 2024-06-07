/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mnz6ei9373v48fm",
    "created": "2024-06-06 04:03:13.932Z",
    "updated": "2024-06-06 04:03:13.932Z",
    "name": "routes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xtzt8iqe",
        "name": "planId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "bxgnazhk6qelsj6",
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
  const collection = dao.findCollectionByNameOrId("mnz6ei9373v48fm");

  return dao.deleteCollection(collection);
})
