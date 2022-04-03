import * as Phaser from 'phaser';
import { CharacterStates } from '~/enums/CharacterStates';
import { CharacterTex } from '~/enums/CharacterTextures';

export default abstract class Stage extends Phaser.Scene {
	abstract playerPosition: { x: number, y: number };

	protected playerSpeed = 85;
	protected cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	protected player!: Phaser.GameObjects.Sprite;
	protected playerState: CharacterStates = CharacterStates.Idle;

	private prevPlayerState: CharacterStates = CharacterStates.Idle;

	protected create() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.anims.createFromAseprite(CharacterTex.Corrupt);

		this.player = this.add.sprite(this.playerPosition.x, this.playerPosition.y, CharacterTex.Corrupt).play({
			key: 'Corrupt-Idle',
			repeat: -1,
		});
		this.player.setOrigin(0.5, 1);
		this.player.setDepth(5);

		this.cameras.main.startFollow(this.player);
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