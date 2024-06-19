/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s18sufx4rdvu4v3");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "s18sufx4rdvu4v3",
    "created": "2024-06-11 03:24:19.670Z",
    "updated": "2024-06-19 19:26:17.851Z",
    "name": "waypoints",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "08a1u8fo",
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
      },
      {
        "system": false,
        "id": "rnkxhxkh",
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
      },
      {
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
      },
      {
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
      },
      {
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
})
