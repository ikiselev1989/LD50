import { CharacterTex } from '~/enums/CharacterTextures';
import Stage from '~/abstracts/Stage';
import { CharacterStates } from '~/enums/CharacterStates';
import { ObjectsTex } from '~/enums/ObjectsTex';
import { Utils } from '~/utils';
import { Depth } from '~/enums/Depth';
import Sprite = Phaser.GameObjects.Sprite;

export default class Player {
	private sprite: Phaser.Physics.Arcade.Sprite & { body: Phaser.Physics.Arcade.Body };
	private scene: Stage;
	private prevPlayerState: CharacterStates = CharacterStates.Idle;

	private state: CharacterStates = CharacterStates.Idle;
	private speed = 85;
	private canMove: boolean = false;
	private canUseShredder: boolean = false;
	private hid: boolean = false;


	constructor(scene: Stage, position: { x: number, y: number }) {
		this.scene = scene;
		scene.anims.createFromAseprite(CharacterTex.Corrupt);

		this.sprite = scene.physics.add.sprite(position.x, position.y, CharacterTex.Corrupt).play({
			key: 'Corrupt-Idle',
			repeat: -1,
		});

		this.sprite.setDepth(Depth.Player);
		this.sprite.setOrigin(0.5, 1);

		scene.physics.add.collider(this.sprite, scene.pappers, (player, collider) => {
			this.collisionHandler(player, collider, ObjectsTex.Pappers);
		});

		scene.physics.add.collider(this.sprite, scene.shredders, (player, collider) => {
			this.collisionHandler(player, collider, ObjectsTex.Shredder);
		});

		scene.physics.add.collider(this.sprite, scene.doors, (player, collider) => {
			this.collisionHandler(player, collider, ObjectsTex.Door);
		});

		scene.physics.add.collider(this.sprite, scene.hides, (player, collider) => {
			// this.collisionHandler(player, collider, ObjectsTex.Door);
		});

		scene.cameras.main.startFollow(this.sprite);

		scene.input.keyboard.on('keydown-SPACE', this.useHandler.bind(this));

		this.canMove = true;
	}

	private collisionHandler(player, collider, type: ObjectsTex) {
		switch (type) {
			case ObjectsTex.Door:
				break;

			case ObjectsTex.Pappers:
				break;

			case ObjectsTex.Shredder:
				break;

			default:
				return;
		}
	}

	moveHandler(delta: number) {
		if (!this.canMove) return;

		const { left, right } = this.scene.cursors;

		if ((!left.isDown && !right.isDown) || (left.isDown && right.isDown)) {
			this.state = CharacterStates.Idle;

			return;
		}

		if (left.isDown) {
			this.sprite.x -= Math.ceil(this.speed * delta / 1000);
			this.sprite.flipX = true;
		}

		if (right.isDown) {
			this.sprite.x += Math.ceil(this.speed * delta / 1000);
			this.sprite.flipX = false;
		}

		this.state = CharacterStates.Walk;
	}

	playerAnimsHandler() {
		if (this.prevPlayerState !== this.state) {
			this.prevPlayerState = this.state;

			switch (this.state) {
				case CharacterStates.Idle:
					this.sprite.play({ key: 'Corrupt-Idle', repeat: -1 });
					break;

				case CharacterStates.Walk:
					this.sprite.play({ key: 'Corrupt-Walk', repeat: -1 });
					break;

				default:
					break;
			}
		}
	}

	private useHandler() {
		if (this.scene.physics.collide(this.sprite, this.scene.hides, (player, hide) => this.useHides(<Sprite>hide))) return;

		this.scene.physics.collide(this.sprite, this.scene.pappers, (player, pappers) => this.grabPappers(<Sprite>pappers));

		this.scene.physics.collide(this.sprite, this.scene.shredders, (player, shredder) => this.useShredder(<Sprite>shredder));

		this.scene.physics.collide(this.sprite, this.scene.doors, (player, door) => this.useDoor(<Sprite>door));
	}

	private grabPappers(sprite: Sprite) {
		if (this.canUseShredder) return;

		this.canUseShredder = true;
		this.scene.pappers.remove(sprite);

		this.scene.tweens.add({
			targets: sprite,
			alpha: 0,
			duration: 250,
		});
	}

	private async useShredder(sprite: Sprite) {
		if (!this.canUseShredder) return;

		this.canUseShredder = false;
		this.scene.shredders.remove(sprite);

		await Utils.asyncAnimation(sprite, 'Shredder-Work');

		sprite.play({ key: 'Shredder-Full', repeat: -1 });
	}

	private useDoor(sprite: Sprite) {
		this.canMove = false;
		this.sprite.setPosition(sprite.x, this.sprite.y);

		this.scene.tweens.add({
			targets: this.sprite,
			alpha: 0,
			duration: 250,
		});
	}

	private async useHides(sprite: Sprite) {
		if (this.hid) {
			this.hid = false;

			await Utils.asyncAnimation(this.sprite, 'Corrupt-Hide', true);

			this.sprite.setDepth(Depth.Player);
			this.canMove = true;
		} else {
			this.sprite.setDepth(Depth.Base);
			this.canMove = false;
			this.hid = true;
			this.sprite.setPosition(sprite.x, this.sprite.y);

			await Utils.asyncAnimation(this.sprite, 'Corrupt-Hide');
		}
	}
}