import { SCENES } from '~/enums/Scenes';
import Stage from '~/abstracts/Stage';

export default class Stage1 extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 48,
		y: 192,
	};
	stageMap: string = 'stage1';
	timeOut: number = 30000;

	constructor() {
		super(SCENES.PLAYGROUND);
	}
}
