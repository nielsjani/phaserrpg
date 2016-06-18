import TextItem from "../classes/TextItem.js";
import TextDisplay from "../classes/TextDisplay";
import Player from "../classes/Player.js";

export default class GameState extends Phaser.State {

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.map = this.add.tilemap("map1");
        this.map.addTilesetImage("pokemon1", "pokemon1");
        this.groundLayer = this.map.createLayer("groundlayer");
        this.collisionLayer = this.map.createLayer("collisionlayer");
        this.addItems();

        this.player = new Player(this, 100, 100, "player");
        this.add.existing(this.player);
        this.camera.follow(this.player);

        this.map.setCollisionBetween(1, 100000, true, 'collisionlayer');

        this.groundLayer.setScale(3);
        this.collisionLayer.setScale(3);
        this.groundLayer.resizeWorld();
        this.collisionLayer.resizeWorld();
    }

    update() {
        this.physics.arcade.collide(this.player, this.collisionLayer);
        this.physics.arcade.collide(this.player, this.items);

        if (this.spacebar.justDown) {
            this.items.children.forEach(child => {
                if (child.overlap(this.player)) {
                    this.handleChildOverlap(child);
                }
            });
        }
    }

    handleChildOverlap(child) {
        if (!this.displayingText) {
            this.currentlyDisplayedText = new TextDisplay(this, 0, 0, child.text);
            this.add.existing(this.currentlyDisplayedText);
            this.displayingText = true;
        } else if (this.currentlyDisplayedText.hasMore()) {
            this.currentlyDisplayedText.updateTextbox();
        } else {
            this.currentlyDisplayedText.destroy();
            this.displayingText = false;
        }
    }

    addItems() {
        this.items = this.add.group();
        this.items.enableBody = true;
        let itemsFromJson = this.getItems();
        itemsFromJson.forEach(item => {
            this.addToGroup(item, this.items);
        })
    }

    getItems() {
        let items = [];
        this.map.objects["itemlayer"].forEach(item => {
            if (item.properties.type === "text") {
                items.push(new TextItem(item.x * 3, (item.y - this.map.tileHeight) * 3, item.properties.text));
            }
        });
        return items;
    }

    addToGroup(item, group) {
        let sprite = group.create(item.x, item.y, "textboard");
        sprite.text = item.text;
        sprite.body.immovable = true;
    }
}