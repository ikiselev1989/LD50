import { SCENES } from '~/enums/Scenes';
import Stage from '~/abstracts/Stage';

export default class Playground extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 16,
		y: 288,
	};
	stageMap: string = 'test-map';

	constructor() {
		super(SCENES.PLAYGROUND);
	}

	preload() {
		this.load.tilemapTiledJSON('test-map', 'test-map.json');
	}

	create() {
		super.create();
	}

	update(time: number, delta: number) {
		super.update(time, delta);
	}


}
