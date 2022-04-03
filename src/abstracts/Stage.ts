import * as Phaser from 'phaser';
import { CharacterTex } from '~/enums/CharacterTextures';
import { MapLayers } from '~/enums/MapLayers';
import { Interactives } from '~/enums/Interactives';
import { ObjectsTex } from '~/enums/ObjectsTex';
import Player from '~/player';
import { Depth } from '~/enums/Depth';
import { StairsDirection } from '~/enums/StairsDirection';
import { Utils } from '~/utils';
import { SCENES } from '~/enums/Scenes';

export default abstract class Stage extends Phaser.Scene {
	abstract playerPosition: { x: number, y: number };
	abstract stageMap: string;
	abstract timeOut: number;
	abstract nextSceneName: SCENES;

	protected player!: Player;

	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	pappers!: Phaser.Physics.Arcade.StaticGroup;
	doors!: Phaser.Physics.Arcade.StaticGroup;
	shredders!: Phaser.Physics.Arcade.StaticGroup;
	map!: Phaser.Tilemaps.Tilemap;
	collidersLayer!: Phaser.Tilemaps.TilemapLayer;

	preload() {
		this.load.tilemapTiledJSON(this.stageMap, `${this.stageMap}.json`);
	}

	protected create() {
		this.pappers = this.physics.add.staticGroup({ key: Interactives.Pappers });
		this.doors = this.physics.add.staticGroup({ key: 'Doors' });
		this.shredders = this.physics.add.staticGroup({ key: Interactives.Shredder });

		this.cursors = this.input.keyboard.createCursorKeys();

		this.createMap();

		this.createPlayer();

		this.countdown();
	}

	private async countdown() {
		this.anims.createFromAseprite(ObjectsTex.CountDown);

		const countdown = this.add.sprite(this.scale.width / 2, this.scale.height / 2, ObjectsTex.CountDown);

		countdown.setOrigin(0.5);
		countdown.setScrollFactor(0);
		countdown.setDepth(50);

		await Utils.asyncAnimation(countdown, 'CountDown');

		countdown.destroy();

		this.player.activate();

		await Utils.asyncWait(this.timeOut, this);

		this.gameOver();
	}

	private gameOver() {
		this.scene.start(this);
	}

	nextScene() {
		this.scene.start(this.nextSceneName);
	}

	private createPlayer() {
		this.player = new Player(this, this.playerPosition);
	}

	private createMap() {
		this.map = this.make.tilemap({ key: this.stageMap });

		const tileset = this.map.addTilesetImage('tiles', 'tiles');

		this.map.createLayer(MapLayers.Back, tileset);
		this.map.createLayer(MapLayers.SubMiddle, tileset);
		this.map.createLayer(MapLayers.Middle, tileset);

		this.collidersLayer = this.map.createLayer(MapLayers.Colliders, tileset);

		const objectsLayer = this.map.getObjectLayer(MapLayers.Objects);
		objectsLayer.objects.forEach(ob => {
			switch (ob.name) {
				case Interactives.DoorUp:
					this.addDoor(ob, StairsDirection.Up);
					break;

				case Interactives.DoorDown:
					this.addDoor(ob, StairsDirection.Down);
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

				case Interactives.Clock:
					this.addClock(ob);
					break;

				default:
					return;
			}
		});
	}

	private addCleaner(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y } = ob;
		this.anims.createFromAseprite(CharacterTex.Cleaner);

		if (typeof x !== 'undefined' && typeof y !== 'undefined') {
			let cleaner = this.add.sprite(x, y, CharacterTex.Cleaner).play({ key: 'Cleaner-Clean', repeat: -1 });

			cleaner.setOrigin(0.5, 1);
		}
	}

	private addClock(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y, width, height } = ob;
		this.anims.createFromAseprite(CharacterTex.Cleaner);

		if (typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
			this.anims.createFromAseprite(ObjectsTex.Clock);

			const ui = this.add.sprite(x + width / 2, y + height / 2, ObjectsTex.Clock).play({
				key: 'Clock-Tic',
				frameRate: 11 / (this.timeOut / 1000),
			});

			ui.setOrigin(0.5, 0.5);
		}
	}

	private addPappers(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y, width, height } = ob;
		this.anims.createFromAseprite(ObjectsTex.Cursor);

		if (typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
			let pappers = this.add.sprite(x + width / 2, y + height, ObjectsTex.Pappers);

			pappers.setDepth(Depth.Objects);
			pappers.setOrigin(0.5, 1);

			this.pappers.add(pappers);

			const cursor = this.add.sprite(pappers.x - 1, pappers.y - 10, ObjectsTex.Cursor);

			cursor.setDepth(Depth.Objects);
			cursor.setOrigin(0.5, 1);

			cursor.play({ key: 'Cursor-Move', repeat: -1 });

			pappers.setDataEnabled();

			pappers.data.set('cursor', cursor);
		}
	}

	private addShredder(ob: Phaser.Types.Tilemaps.TiledObject) {
		const { x, y, width, height } = ob;
		this.anims.createFromAseprite(ObjectsTex.Shredder);

		if (typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
			let shredder = this.add.sprite(x + width / 2, y + height, ObjectsTex.Shredder).play({
				key: 'Shredder-Idle',
				repeat: -1,
			});

			shredder.setDepth(Depth.Objects);
			shredder.setOrigin(0.5, 1);

			this.shredders.add(shredder);
		}
	}

	private addDoor(ob: Phaser.Types.Tilemaps.TiledObject, direction: StairsDirection) {
		const { x, y, width, height } = ob;

		if (typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
			// @ts-ignore
			let door = this.physics.add.staticSprite(x + width / 2, y + height / 2);

			door.setDataEnabled();

			door.data.set('direction', direction);
			door.body.setSize(width, height);

			this.doors.add(door);
		}
	}


	update(time: number, delta: number) {
		this.player.moveHandler();
		this.player.playerAnimsHandler();
	}
}