import { SCENES } from '~/enums/Scenes';
import Stage from '~/abstracts/Stage';

export default class Stage1 extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 48,
		y: 192,
	};
	stageMap: string = 'stage1';
	timeOut: number = 25000;
	nextSceneName = SCENES.Scene2;

	constructor() {
		super(SCENES.Scene1);
	}
}
