import { SCENES } from '~/enums/Scenes';
import Stage from '~/abstracts/Stage';

export default class Playground extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 48,
		y: 192,
	};
	stageMap: string = 'stage1';

	constructor() {
		super(SCENES.PLAYGROUND);
	}

	create() {
		super.create();
	}

	update(time: number, delta: number) {
		super.update(time, delta);
	}
}
