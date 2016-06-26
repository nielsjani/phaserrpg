export default class TextItem {
    constructor(x, y, sprite, text) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.text = text;
        this.collides = true;
    }

    getCustomProperties() {
        return {
            text: this.text,
            collides: true
        }
    }
}