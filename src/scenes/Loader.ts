import { SCENES } from '~/enums/Scenes';
import { Scene } from 'phaser';
import { CharacterTex } from '~/enums/CharacterTextures';

export default class Loader extends Scene {
	constructor() {
		super(SCENES.LOADER);
	}

	preload() {
		this.load.aseprite('cleaner', '/animations/cleaner/cleaner.png', '/animations/cleaner/cleaner.json');
		this.load.aseprite(CharacterTex.Corrupt, `/animations/${CharacterTex.Corrupt}/${CharacterTex.Corrupt}.png`, `/animations/${CharacterTex.Corrupt}/${CharacterTex.Corrupt}.json`);

		this.load.image('tiles', `tiles..png`);
		this.load.image('bg', `bg.png`);

		this.load.on('complete', () => {
			this.scene.launch(SCENES.PLAYGROUND);
		});
	}
}
