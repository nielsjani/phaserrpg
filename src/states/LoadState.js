export default class LoadState extends Phaser.State {

    preload() {
        this.load.tilemap("map1", "images/maps/map1.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("pokemon1", "images/tilesets/tileset1.png");
        this.load.spritesheet("player", "images/spritesheets/player_transp.png", 16, 20);
        this.load.image("textboard", "images/items/textboard.png");
        this.load.image("invisibleBlock", "images/items/invisibleBlock.png");
    }


    create() {
        this.state.start("GameState", false, false);
    }
}

