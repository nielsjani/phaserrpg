export default class TextDisplay extends Phaser.Text {
    constructor(state, x, y, text) {
        super(state.game, x, y, text, TextDisplay.getStyle());
        this.setText(this.getFirstTextChunk(text));
        this.setTextBounds(25, state.camera.y + (state.camera.height - 150), 800, 100);
    }

    updateTextbox() {
        this.setText(this.textToDisplay[this.textDisplayingPart + 1]);
        this.setStyle(TextDisplay.getStyle());
        this.textDisplayingPart += 1;
    }

    hasMore() {
        return this.textDisplayingPart + 1 < this.textToDisplay.length;
    }

    static getStyle() {
        return {
            align: "left",
            font: 'bold 24pt Arial',
            fill: 'white',
            wordWrap: true,
            wordWrapWidth: 750,
            backgroundColor: "blue",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
    }

    getFirstTextChunk(text) {
        this.textToDisplay = text.split("#");
        this.textDisplayingPart = 1;
        return this.textToDisplay[this.textDisplayingPart];
    }
}