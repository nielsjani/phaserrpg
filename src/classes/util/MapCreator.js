import TextItem from "../TextItem.js";
import DoorItem from "../DoorItem.js";

export default class MapCreator {
    constructor() {

    }

    createMap(state) {
        state.map = state.add.tilemap(state.mapname);
        state.map.addTilesetImage("pokemon1", "pokemon1");
        state.groundLayer = state.map.createLayer("groundlayer");
        state.collisionLayer = state.map.createLayer("collisionlayer");
        this.addItems(state);
        state.map.setCollisionBetween(1, 100000, true, 'collisionlayer');

        state.groundLayer.setScale(3);
        state.collisionLayer.setScale(3);
        state.groundLayer.resizeWorld();
        state.collisionLayer.resizeWorld();
    }

    addItems(state) {
        state.items = state.add.group();
        state.items.enableBody = true;
        let itemsFromJson = this.getItems(state);
        itemsFromJson.forEach(item => {
            this.addToGroup(item, state.items);
        })
    }

    getItems(state) {
        let items = [];
        state.map.objects["itemlayer"].forEach(item => {
            if (item.properties.type === "text") {
                items.push(new TextItem(item.x * 3, (item.y - state.map.tileHeight) * 3, item.properties.sprite, item.properties.text));
            }
            if (item.properties.type === "door") {
                items.push(new DoorItem(item.x * 3, (item.y - state.map.tileHeight) * 3, item.properties.sprite, item.properties.map, item.properties.x, item.properties.y));
            }
        });
        return items;
    }

    addToGroup(item, group) {
        let sprite = group.create(item.x, item.y, item.sprite);
        sprite.customProperties = item.getCustomProperties();
        sprite.body.immovable = sprite.customProperties.collides;
    }
}