import { SCENES } from '~/enums/Scenes';
import Stage from '~/abstracts/Stage';

export default class Stage2 extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 48,
		y: 288,
	};
	stageMap: string = 'stage2';
	timeOut: number = 40000;
	nextSceneName = SCENES.SCENE2;

	constructor() {
		super(SCENES.SCENE2);
	}
}
