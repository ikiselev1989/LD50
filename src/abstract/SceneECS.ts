import { createWorld, IWorld, pipe } from 'bitecs';
import { EntityConfig, SceneECSData, SystemCreateFunction } from '../types';

export default abstract class SceneECS extends Phaser.Scene {
	abstract sceneECSData: SceneECSData;

	private world: IWorld = createWorld();
	private pipeline;

	public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

	init() {
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	create() {
		this.addEntities(this.sceneECSData.entities || []);
		this.addSystems(this.sceneECSData.systems || []);
	}

	update(time: number, delta: number) {
		if (!this.world && !this.pipeline) return;

		this.pipeline(this.world);
	}

	private addEntities(entities: EntityConfig<any>[]) {
		entities.map(({ func, data }) => func(this.world, data));
	}

	private addSystems(systems: SystemCreateFunction[]) {
		this.pipeline = pipe(...systems.map(system => system(this)));
	}
}
