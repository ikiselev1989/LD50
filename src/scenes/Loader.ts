import { SCENES } from '~/enums/Scenes';
import { Scene } from 'phaser';
import { CharacterTex } from '~/enums/CharacterTextures';
import { ObjectsTex } from '~/enums/ObjectsTex';
import { Assets } from '~/enums/Assets';

export default class Loader extends Scene {
	constructor() {
		super(SCENES.LOADER);
	}

	preload() {
		this.load.audio(ObjectsTex.Pappers, `/assets/${ObjectsTex.Pappers}.mp3`);
		this.load.audio(ObjectsTex.Shredder, `/assets/${ObjectsTex.Shredder}.mp3`);
		this.load.audio(Assets.Over, `/assets/${Assets.Over}.mp3`);

		this.load.aseprite(CharacterTex.Cleaner, `/animations/${CharacterTex.Cleaner}.png`, `/animations/${CharacterTex.Cleaner}.json`);
		this.load.aseprite(CharacterTex.Corrupt, `/animations/${CharacterTex.Corrupt}.png`, `/animations/${CharacterTex.Corrupt}.json`);
		this.load.aseprite(ObjectsTex.Shredder, `/animations/${ObjectsTex.Shredder}.png`, `/animations/${ObjectsTex.Shredder}.json`);
		this.load.aseprite(ObjectsTex.Cursor, `/animations/${ObjectsTex.Cursor}.png`, `/animations/${ObjectsTex.Cursor}.json`);
		this.load.aseprite(ObjectsTex.Clock, `/animations/${ObjectsTex.Clock}.png`, `/animations/${ObjectsTex.Clock}.json`);
		this.load.aseprite(ObjectsTex.CountDown, `/animations/${ObjectsTex.CountDown}.png`, `/animations/${ObjectsTex.CountDown}.json`);

		this.load.image(ObjectsTex.Pappers, `/assets/${ObjectsTex.Pappers}.png`);

		this.load.image('tiles', `tiles.png`);

		this.load.on('complete', () => {
			this.scene.launch(SCENES.SCENE2);
		});
	}
}
