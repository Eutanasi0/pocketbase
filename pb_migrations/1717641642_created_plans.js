/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bxgnazhk6qelsj6",
    "created": "2024-06-06 02:40:42.996Z",
    "updated": "2024-06-06 02:40:42.996Z",
    "name": "plans",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0o1a0iyl",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("bxgnazhk6qelsj6");

  return dao.deleteCollection(collection);
})
