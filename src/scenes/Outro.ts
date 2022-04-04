import { Scene } from 'phaser';
import { SCENES } from '~/enums/Scenes';
import { Assets } from '~/enums/Assets';

export default class Outro extends Scene {
	private image: any;

	constructor() {
		super(SCENES.Outro);
	}

	create() {
		this.image = this.add.image(this.scale.width / 2, this.scale.height / 2, Assets.MainScreen3);
		this.image.setOrigin(0.5);
	}
}