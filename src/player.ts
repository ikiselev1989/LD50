import { CharacterTex } from '~/enums/CharacterTextures';
import Stage from '~/abstracts/Stage';
import { CharacterStates } from '~/enums/CharacterStates';
import { Utils } from '~/utils';
import { Depth } from '~/enums/Depth';
import { StairsDirection } from '~/enums/StairsDirection';
import Sprite = Phaser.GameObjects.Sprite;
import Phaser from 'phaser';

export default class Player {
	private sprite: Phaser.Physics.Arcade.Sprite & { body: Phaser.Physics.Arcade.Body };
	private scene: Stage;
	private prevPlayerState: CharacterStates = CharacterStates.Idle;

	private state: CharacterStates = CharacterStates.Idle;
	private speed = 100;
	private canMove: boolean = false;
	private canUseShredder: boolean = false;

	constructor(scene: Stage, position: { x: number, y: number }) {
		this.scene = scene;
		scene.anims.createFromAseprite(CharacterTex.Corrupt);

		this.sprite = scene.physics.add.sprite(position.x, position.y, CharacterTex.Corrupt).play({
			key: 'Corrupt-Idle',
			repeat: -1,
		});

		this.sprite.setDepth(Depth.Player);
		this.sprite.setOrigin(0.5, 1);
		this.sprite.setBounce(1);

		this.scene.physics.add.collider(this.sprite, this.scene.collidersLayer)
		this.scene.collidersLayer.setCollision(113);

		scene.cameras.main.startFollow(this.sprite, true, 1, 1, 0, 50);

		scene.input.keyboard.on('keydown-SPACE', this.useHandler.bind(this));

		this.canMove = true;
	}

	moveHandler() {
		if (!this.canMove) return;

		const { left, right } = this.scene.cursors;

		if ((!left.isDown && !right.isDown) || (left.isDown && right.isDown)) {
			this.sprite.setVelocityX(0);
			this.state = CharacterStates.Idle;

			return;
		}

		if (left.isDown) {
			this.sprite.setVelocityX(-this.speed);
			this.sprite.flipX = true;
		}

		if (right.isDown) {
			this.sprite.setVelocityX(this.speed);
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

	private async useDoor(sprite: Sprite) {
		this.sprite.setVelocityX(0);

		this.sprite.play({ key: 'Corrupt-Idle', repeat: -1 });

		this.canMove = false;
		this.sprite.setPosition(sprite.x, this.sprite.y);

		await Utils.asyncTween(this.scene.tweens.create({
			targets: this.sprite,
			alpha: 0,
			duration: 250,
		}));

		const yOffset = sprite.data.get('direction') === StairsDirection.Up ? -96 : 96;

		await Utils.asyncTween(this.scene.tweens.create({
			targets: this.sprite,
			y: this.sprite.y + yOffset,
			duration: 750,
		}));

		await Utils.asyncTween(this.scene.tweens.create({
			targets: this.sprite,
			alpha: 1,
			duration: 250,
		}));

		this.canMove = true;
	}
}