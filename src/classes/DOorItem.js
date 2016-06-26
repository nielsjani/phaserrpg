export default class DoorItem {
    constructor(x, y, sprite, map, playerx, playery) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.map = map;
        this.playerx = playerx;
        this.playery = playery;
    }

    getCustomProperties() {
        return {
            map: this.map,
            collides: false,
            playerx: this.playerx,
            playery: this.playery
        }
    }
}