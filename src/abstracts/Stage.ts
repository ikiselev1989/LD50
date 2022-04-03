import * as Phaser from 'phaser';
import { CharacterStates } from '~/enums/CharacterStates';
import { CharacterTex } from '~/enums/CharacterTextures';
import { MAP_LAYERS } from '~/enums/MapLayers';
import { Interactives } from '~/enums/Interactives';
import { ObjectsTex } from '~/enums/ObjectsTex';
import { Assets } from '~/enums/Assets';

export default abstract class Stage extends Phaser.Scene {
	abstract playerPosition: { x: number, y: number };
	abstract stageMap: string;

	protected playerSpeed = 85;
	protected cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	protected player!: Phaser.GameObjects.Sprite;
	protected playerState: CharacterStates = CharacterStates.Idle;

	private prevPlayerState: CharacterStates = CharacterStates.Idle;

	protected create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.createMap();

		this.anims.createFromAseprite(CharacterTex.Corrupt);

		this.player = this.add.sprite(this.playerPosition.x, this.playerPosition.y, CharacterTex.Corrupt).play({
			key: 'Corrupt-Idle',
			repeat: -1,
		});

		this.player.setOrigin(0.5, 1);

		this.cameras.main.startFollow(this.player);
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
			let pappers = this.add.sprite(x + width / 2, y + height, Assets.Pappers);

			pappers.setOrigin(0.5, 1);
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
		}
	}

	update(time: number, delta: number) {
		this.moveHandler(delta);
		this.playerAnimsHandler();
	}

	private moveHandler(delta: number) {
		const { left, right } = this.cursors;

		if ((!left.isDown && !right.isDown) || (left.isDown && right.isDown)) {
			this.playerState = CharacterStates.Idle;

			return;
		}

		if (left.isDown) {
			this.player.x -= Math.ceil(this.playerSpeed * delta / 1000);
			this.player.flipX = true;
		}

		if (right.isDown) {
			this.player.x += Math.ceil(this.playerSpeed * delta / 1000);
			this.player.flipX = false;
		}

		this.playerState = CharacterStates.Walk;
	}

	private playerAnimsHandler() {
		if (this.prevPlayerState !== this.playerState) {
			this.prevPlayerState = this.playerState;

			switch (this.playerState) {
				case CharacterStates.Idle:
					this.player.play({ key: 'Corrupt-Idle', repeat: -1 });
					break;

				case CharacterStates.Walk:
					this.player.play({ key: 'Corrupt-Walk', repeat: -1 });
					break;

				default:
					break;
			}
		}
	}
}