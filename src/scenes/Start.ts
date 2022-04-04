import { Scene } from 'phaser';
import { Assets } from '~/enums/Assets';
import { SCENES } from '~/enums/Scenes';

export default class Start extends Scene {
	constructor() {
		super(SCENES.Start);
	}

	create() {
		const screen = this.add.image(this.scale.width / 2, this.scale.height / 2, Assets.MainScreen);
		screen.setOrigin(0.5);

		const keyObj = this.input.keyboard.addKey('space');

		keyObj.on('down', this.nextScene.bind(this));
	}

	private nextScene() {
		this.scene.start(SCENES.Scene1);
	}
}