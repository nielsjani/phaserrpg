export default class DoorItem {
    constructor(x, y, sprite, map, playerx, playery, tileset) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.map = map;
        this.playerx = playerx;
        this.playery = playery;
        this.tileset = tileset;
    }

    getCustomProperties() {
        return {
            map: this.map,
            tileset: this.tileset,
            collides: false,
            playerx: this.playerx,
            playery: this.playery,
            handleOverlap: this.handleOverlap
        }
    }

    handleOverlap(state){
        state.state.start("GameState", true, false, this.map, this.tileset);
    }
}