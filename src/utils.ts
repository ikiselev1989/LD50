import { CHARACTER_TEXTURES } from '~/enums/CharacterTextures';
import * as Phaser from 'phaser';
import { Scene } from 'phaser';

export class Utils {
	static getEnumStringValueIndex(data: object, value: string): number {
		let values = Object.keys(data).map(tex => CHARACTER_TEXTURES[tex]);

		return values.indexOf(value);
	}

	static asyncTween(tween: Phaser.Tweens.Tween) {
		return new Promise(resolve => {
			tween.once('complete', () => resolve());
			tween.play();
		});
	}

	static asyncWait(time: number, scene: Scene) {
		return new Promise(resolve => {
			scene.time.delayedCall(time, resolve);
		});
	}
}
