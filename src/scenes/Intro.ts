import { Scene } from 'phaser';
import { Utils } from '~/utils';
import { ASSETS } from '~/enums/Assets';
import { SCENES } from '~/enums/Scenes';

export default class Intro extends Scene {
	private gonzoLogo!: Phaser.GameObjects.Image;
	private phaserLogo!: Phaser.GameObjects.Image;

	preload() {
		this.load.image(ASSETS.GONZO_LOGO, `/assets/${ASSETS.GONZO_LOGO}.png`);
		this.load.image(ASSETS.PHASER_LOGO, `/assets/${ASSETS.PHASER_LOGO}.png`);
	}

	create() {
		const { width, height } = this.game.scale;

		this.cameras.main.setBackgroundColor('#422531');

		this.gonzoLogo = this.add.image(<number>width / 2, <number>height / 2, ASSETS.GONZO_LOGO);
		this.gonzoLogo.alpha = 0;

		this.phaserLogo = this.add.image(<number>width / 2, <number>height / 2, ASSETS.PHASER_LOGO);
		this.phaserLogo.alpha = 0;

		this.logoAnimation();
	}

	async logoAnimation() {
		await Utils.asyncTween(
			this.tweens.create({
				targets: this.gonzoLogo,
				alpha: 1,
				delay: 500,
				duration: 1000,
				ease: 'Cubic',
			}),
		);

		await Utils.asyncWait(1000, this);

		await Utils.asyncTween(
			this.tweens.create({
				targets: this.gonzoLogo,
				alpha: 0,
				duration: 2000,
				ease: 'Cubic',
			}),
		);

		await Utils.asyncWait(500, this);

		await Utils.asyncTween(
			this.tweens.create({
				targets: this.phaserLogo,
				alpha: 1,
				duration: 1000,
				ease: 'Cubic',
			}),
		);

		await Utils.asyncWait(1000, this);

		await Utils.asyncTween(
			this.tweens.create({
				targets: this.phaserLogo,
				alpha: 0,
				duration: 2000,
				ease: 'Cubic',
			}),
		);

		this.scene.start(SCENES.LOADER);
	}
}
