import { SCENES } from '~/enums/Scenes';
import Stage from '~/abstracts/Stage';

export default class Stage3 extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 48,
		y: 384,
	};
	stageMap: string = 'stage3';
	timeOut: number = 57000;
	nextSceneName = SCENES.Scene3;

	constructor() {
		super(SCENES.Scene3);
	}
}
