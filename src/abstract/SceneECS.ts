import { createWorld, IWorld, pipe } from 'bitecs';
import { EntityConfig, SceneECSData, SystemCreateFunction } from '../types';
import * as Phaser from 'phaser';
import Map = Phaser.Structs.Map;

export default abstract class SceneECS extends Phaser.Scene {
	abstract sceneECSData: SceneECSData;

	private world: IWorld = createWorld();
	private pipeline;
	private entitiesRenders = new Map<number, Phaser.GameObjects.Sprite>([]);

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

	addEntitiesRender(key, sprite) {
		this.entitiesRenders.set(key, sprite);
	}

	getEntitiesRender(key): Phaser.GameObjects.Sprite | null {
		if (this.entitiesRenders.has(key)) {
			return this.entitiesRenders.get(key);
		}

		return null;
	}

	removeEntitiesRender(key) {
		if (this.entitiesRenders.has(key)) {
			return this.entitiesRenders.delete(key);
		}
	}

	private addEntities(entities: EntityConfig<any>[]) {
		entities.map(({ func, data }) => func(this.world, data));
	}

	private addSystems(systems: SystemCreateFunction[]) {
		this.pipeline = pipe(...systems.map(system => system(this)));
	}
}
