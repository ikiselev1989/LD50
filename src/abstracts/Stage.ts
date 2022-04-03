import * as Phaser from 'phaser';
import { CharacterTex } from '~/enums/CharacterTextures';
import { MAP_LAYERS } from '~/enums/MapLayers';
import { Interactives } from '~/enums/Interactives';
import { ObjectsTex } from '~/enums/ObjectsTex';
import { Assets } from '~/enums/Assets';
import Player from '~/player';

export default abstract class Stage extends Phaser.Scene {
	abstract playerPosition: { x: number, y: number };
	abstract stageMap: string;

	protected player!: Player;

	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	pappers!: Phaser.Physics.Arcade.Group;
	doors!: Phaser.Physics.Arcade.Group;
	shredders!: Phaser.Physics.Arcade.Group;

	protected create() {
		this.pappers = this.physics.add.group({ key: ObjectsTex.Pappers });
		this.doors = this.physics.add.group({ key: ObjectsTex.Door });
		this.shredders = this.physics.add.group({ key: ObjectsTex.Shredder });

		this.cursors = this.input.keyboard.createCursorKeys();

		this.createMap();

		this.createPlayer();
	}

	private createPlayer() {
		this.player = new Player(this, this.playerPosition);
	}

	private createMap() {
		const map = this.make.tilemap({ key: this.stageMap, tileHeight: 16, tileWidth: 16 });

		const tileset = map.addTilesetImage('tiles', 'tiles');

		map.createLayer(MAP_LAYERS.WALLS, tileset);
		map.createLayer(MAP_LAYERS.ELEVATORS, tileset);
		map.createLayer(MAP_LAYERS.DOORS, tileset);
		map.createLayer(MAP_LAYERS.FURNITURES, tileset);
		map.createLayer(MAP_LAYERS.OBJECTS, tileset);

		const objectsLayer = map.getObjectLayer(MAP_LAYERS.INTERACTIVES);

		objectsLayer.objects.forEach(ob => {
			switch (ob.name) {
				case Interactives.Door:
					this.addDoor(ob);
					break;

				case Interactives.Pappers:
					this.addPappers(ob);
					break;

				case Interactives.Shredder:
					this.addShredder(ob);
					break;

				case Interactives.Cleaner:
					this.addCleaner(ob);
					break;

				default:
					return;
			}
		});
	}

	private addCleaner(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y } = ob;
		this.anims.createFromAseprite(CharacterTex.Cleaner);

		if (x && y) {
			let cleaner = this.add.sprite(x, y, CharacterTex.Cleaner).play({ key: 'Cleaner-Clean', repeat: -1 });

			cleaner.setOrigin(0.5, 1);
		}
	}

	private addPappers(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y, width, height } = ob;

		if (x && y && width && height) {
			let pappers = this.add.sprite(x + width / 2, y + height, ObjectsTex.Pappers);

			pappers.setOrigin(0.5, 1);

			this.pappers.add(pappers);
		}
	}

	private addShredder(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y, width, height } = ob;
		this.anims.createFromAseprite(ObjectsTex.Shredder);

		if (x && y && width && height) {
			let shredder = this.add.sprite(x + width / 2, y + height, ObjectsTex.Shredder).play({
				key: 'Shredder-Idle',
				repeat: -1,
			});

			shredder.setOrigin(0.5, 1);

			this.shredders.add(shredder);
		}
	}

	private addDoor(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y, width, height } = ob;

		if (x && y && width && height) {
			// @ts-ignore
			let door = this.add.sprite(x + width / 2, y + height);

			door.setSize(width, height);
			door.setOrigin(0.5, 0.5);

			this.doors.add(door);
		}
	}

	update(time: number, delta: number) {
		this.player.moveHandler(delta);
		this.player.playerAnimsHandler();
	}
}