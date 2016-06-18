import TextItem from "../classes/TextItem.js";
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

        this.player = new Player(this, 100,100, "player");
        this.add.existing(this.player);
        this.camera.follow(this.player);

        //this.player = this.add.sprite(100, 100, "player");

        //this.player.animations.add('left', [0, 1, 2], 10, true);
        //this.player.animations.add('right', [3, 4, 5], 10, true);
        //this.player.animations.add('down', [6, 7, 8], 10, true);
        //this.player.animations.add('up', [9, 10, 11], 10, true);
        //this.physics.arcade.enable(this.player);

        this.map.setCollisionBetween(1, 100000, true, 'collisionlayer');

        this.groundLayer.setScale(3);
        this.collisionLayer.setScale(3);
        //this.player.scale.setTo(3);
        this.groundLayer.resizeWorld();
        this.collisionLayer.resizeWorld();

        let style = {
            font: 'bold 16pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 100
        };
        let text = this.add.text(this.world.centerX, this.world.centerY, "A textje and another textje to round if off super kei lang enzo pfffft", style);

        //this.idlePoses = new Map();
        //this.idlePoses.set("left", 1);
        //this.idlePoses.set("right", 4);
        //this.idlePoses.set("down", 7);
        //this.idlePoses.set("up", 10);
    }

    update() {
        this.physics.arcade.collide(this.player, this.collisionLayer);
        this.physics.arcade.collide(this.player, this.items);

        //this.player.body.velocity.x = 0;
        //this.player.body.velocity.y = 0;
        if (this.spacebar.isDown) {
            this.items.children.forEach(child => {
                if (child.overlap(this.player)) {
                    console.log(child.text);
                }
            });
        }
        //if (this.cursors.left.isDown) {
        //    this.player.body.velocity.x = -600;
        //    this.player.animations.play("left");
        //    this.lastDirection = "left";
        //} else if (this.cursors.right.isDown) {
        //    this.player.body.velocity.x = +600;
        //    this.player.animations.play("right");
        //    this.lastDirection = "right";
        //} else if (this.cursors.up.isDown) {
        //    this.player.body.velocity.y = -600;
        //    this.player.animations.play("up");
        //    this.lastDirection = "up";
        //} else if (this.cursors.down.isDown) {
        //    this.player.body.velocity.y = +600;
        //    this.player.animations.play("down");
        //    this.lastDirection = "down";
        //} else {
        //    this.player.animations.stop();
        //    this.player.frame = this.lastDirection ? this.idlePoses.get(this.lastDirection) : 7;
        //}
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

    render() {

        this.game.debug.cameraInfo(this.camera, 32, 32);

        // Sprite debug info
        //this.game.debug.spriteInfo(this.player, 32, 32);

    }
}