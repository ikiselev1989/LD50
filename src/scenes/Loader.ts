import { SCENES } from '~/enums/Scenes';
import { Scene } from 'phaser';
import { CharacterTex } from '~/enums/CharacterTextures';
import { ObjectsTex } from '~/enums/ObjectsTex';

export default class Loader extends Scene {
	constructor() {
		super(SCENES.LOADER);
	}

	preload() {
		this.load.aseprite(CharacterTex.Cleaner, `/animations/${CharacterTex.Cleaner}.png`, `/animations/${CharacterTex.Cleaner}.json`);
		this.load.aseprite(CharacterTex.Corrupt, `/animations/${CharacterTex.Corrupt}.png`, `/animations/${CharacterTex.Corrupt}.json`);
		this.load.aseprite(ObjectsTex.Shredder, `/animations/${ObjectsTex.Shredder}.png`, `/animations/${ObjectsTex.Shredder}.json`);

		this.load.image(ObjectsTex.Pappers, `/assets/${ObjectsTex.Pappers}.png`);

		this.load.image('tiles', `tiles.png`);

		this.load.on('complete', () => {
			this.scene.launch(SCENES.PLAYGROUND);
		});
	}
}
