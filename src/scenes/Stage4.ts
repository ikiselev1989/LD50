import { SCENES } from '~/enums/Scenes';
import Stage from '~/abstracts/Stage';

export default class Stage4 extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 48,
		y: 480,
	};
	stageMap: string = 'stage4';
	timeOut: number = 57000;
	nextSceneName = SCENES.Scene4;

	constructor() {
		super(SCENES.Scene4);
	}
}
