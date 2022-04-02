import SceneECS from '~/abstract/SceneECS';
import { EntityConfig, SceneECSData } from '~/types';
import { CharacterData } from '~/entities/Character';
import Player from '~/entities/Player';
import Render from '~/systems/Render';
import Movement from '~/systems/Movement';
import PlayerInput from '~/systems/PlayerInput';
import CameraFollow from '~/systems/CameraFollow';
import { SCENES } from '~/enums/Scenes';
import { CHARACTER_TEXTURES } from '~/enums/CharacterTextures';
import { MAP_LAYERS } from '~/enums/MapLayers';

let player: EntityConfig<CharacterData> = {
	func: Player,
	data: {
		x: 0,
		y: 240,
		z: 0,
		pivotX: 0.5,
		pivotY: 1,
		texture: CHARACTER_TEXTURES.PLAYER,
		speed: 1,
	},
};

export default class Playground extends SceneECS {
	sceneECSData: SceneECSData = {
		entities: [player],
		systems: [Movement, Render, PlayerInput, CameraFollow],
	};

	constructor() {
		super(SCENES.PLAYGROUND);
	}

	preload() {
		this.load.tilemapTiledJSON('test-map', 'test-map.json');
	}

	create() {
		super.create();

		const map = this.make.tilemap({ key: 'test-map', tileHeight: 16, tileWidth: 16 });

		const tileset = map.addTilesetImage('tiles', 'tiles');

		map.createLayer(MAP_LAYERS.WALLS, tileset);
		map.createLayer(MAP_LAYERS.ELEVATORS, tileset);
		map.createLayer(MAP_LAYERS.DOORS, tileset);
		map.createLayer(MAP_LAYERS.FURNITURES, tileset);
		map.createLayer(MAP_LAYERS.OBJECTS, tileset);
	}
}
