import { Scene } from 'phaser';
import { Assets } from '~/enums/Assets';
import { SCENES } from '~/enums/Scenes';
import { Utils } from '~/utils';

export default class Start extends Scene {
	private screen!: Phaser.GameObjects.Image;
	private onboarding!: Phaser.GameObjects.Image;

	constructor() {
		super(SCENES.Start);
	}

	create() {
		this.onboarding = this.add.image(this.scale.width / 2, this.scale.height / 2, Assets.MainScreen2);
		this.onboarding.setOrigin(0.5);

		this.screen = this.add.image(this.scale.width / 2, this.scale.height / 2, Assets.MainScreen);
		this.screen.setOrigin(0.5);

		const keyObj = this.input.keyboard.addKey('space');

		keyObj.on('down', this.nextScene.bind(this));
	}

	private async nextScene() {
		this.tweens.add({
			targets: this.screen,
			alpha: 0,
			duration: 1000,
			ease: 'Cubic',
		});

		await Utils.asyncWait(5000, this);

		this.scene.start(SCENES.Scene1);
	}
}