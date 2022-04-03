import { SCENES } from '~/enums/Scenes';
import { MAP_LAYERS } from '~/enums/MapLayers';
import { INTERACTIVES } from '~/enums/Interactives';
import Stage from '~/abstracts/Stage';

export default class Playground extends Stage {
	playerPosition: { x: number; y: number } = {
		x: 16,
		y: 288,
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

		const objectsLayer = map.getObjectLayer(MAP_LAYERS.INTERACTIVES);
		objectsLayer.objects.forEach(ob => {
			switch (ob.name) {
				case INTERACTIVES.DOOR:
					break;

				case INTERACTIVES.PAPPERS:
					break;

				case INTERACTIVES.SHREDDER:
					break;

				default:
					return;
			}
		});

		this.anims.createFromAseprite('cleaner');

		let cleaner = this.add.sprite(106, 288, 'cleaner').play({ key: 'Cleaner-Clean', repeat: -1 });

		cleaner.setOrigin(0.5, 1);
	}

	update(time: number, delta: number) {
		super.update(time, delta);
	}

}
