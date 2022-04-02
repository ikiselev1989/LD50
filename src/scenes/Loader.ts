import { SCENES } from '~/enums/Scenes';
import { Scene } from 'phaser';
import { CHARACTER_TEXTURES } from '~/enums/CharacterTextures';

export default class Loader extends Scene {
	constructor() {
		super(SCENES.LOADER);
	}

	preload() {
		this.load.image(CHARACTER_TEXTURES.PLAYER, `/animations/${CHARACTER_TEXTURES.PLAYER}.png`);
		this.load.image('bg', `bg.png`);

		this.load.on('complete', () => {
			this.scene.launch(SCENES.PLAYGROUND);
		});
	}
}
