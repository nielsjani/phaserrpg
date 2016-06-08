import GameState from 'states/GameState.js';
import LoadState from 'states/LoadState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('LoadState', LoadState, false);
		this.state.add('GameState', GameState, false);
		this.state.start('LoadState');
	}

}

new Game();
