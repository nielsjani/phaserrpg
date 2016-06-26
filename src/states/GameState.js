import TextItem from "../classes/TextItem.js";
import TextDisplay from "../classes/TextDisplay";
import Player from "../classes/Player.js";
import MapCreator from "../classes/util/MapCreator.js";

export default class GameState extends Phaser.State {

    init(mapname, tileset) {
        this.mapname = mapname;
        this.tileset = tileset;
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        new MapCreator().createMap(this);

        this.addPlayerAndCamera();
    }

    update() {
        this.physics.arcade.collide(this.player, this.collisionLayer);
        this.physics.arcade.collide(this.player, this.items.children.filter(child => child.customProperties.collides));

        this.items.children.forEach(child => {
            if (child.overlap(this.player)) {
                child.customProperties.handleOverlap(this);
            }
        });
    }

    addPlayerAndCamera() {
        this.player = new Player(this, 100, 100, "player");
        this.add.existing(this.player);

        this.camera.follow(this.player);
    }

    shutdown() {
        //kill/destroy all resources
    }
}