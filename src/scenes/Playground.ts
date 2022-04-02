import SceneECS from '~/abstract/SceneECS';
import { EntityConfig, SceneECSData } from '~/types';
import { CharacterData } from '~/entities/Character';
import Player from '~/entities/Player';
import Render from '~/systems/Render';
import Movement from '~/systems/Movement';
import PlayerInput from '~/systems/PlayerInput';
import { SCENES } from '~/enums/Scenes';
import { CHARACTER_TEXTURES } from '~/enums/CharacterTextures';

let player: EntityConfig<CharacterData> = {
	func: Player,
	data: {
		x: 200,
		y: 250,
		z: 0,
		texture: CHARACTER_TEXTURES.PLAYER,
		speed: 1,
	},
};

export default class Playground extends SceneECS {
	sceneECSData: SceneECSData = {
		entities: [player],
		systems: [Movement, Render, PlayerInput],
	};

	constructor() {
		super(SCENES.PLAYGROUND);
	}

	preload() {
	}

	create() {
		super.create();
	}
}
