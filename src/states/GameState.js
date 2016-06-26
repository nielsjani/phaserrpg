import TextItem from "../classes/TextItem.js";
import TextDisplay from "../classes/TextDisplay";
import Player from "../classes/Player.js";
import MapCreator from "../classes/util/MapCreator.js";

export default class GameState extends Phaser.State {

    init(mapname) {
        this.mapname = mapname;
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
            if (child.overlap(this.player) && this.spacebar.justDown) {
                this.handleChildOverlap(child);
            }
        });
    }

    handleChildOverlap(child) {
        if (!this.displayingText) {
            this.currentlyDisplayedText = new TextDisplay(this, 0, 0, child.customProperties.text);
            this.add.existing(this.currentlyDisplayedText);
            this.displayingText = true;
        } else if (this.currentlyDisplayedText.hasMore()) {
            this.currentlyDisplayedText.updateTextbox();
        } else {
            this.currentlyDisplayedText.destroy();
            this.displayingText = false;
        }
    }

    addPlayerAndCamera() {
        this.player = new Player(this, 100, 100, "player");
        this.add.existing(this.player);
        this.camera.follow(this.player);
    }
}