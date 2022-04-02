import { IWorld, System } from 'bitecs';
import SceneECS from '~/abstract/SceneECS';

export type SystemCreateFunction = (scene: SceneECS) => System;

export type SceneECSData = {
	entities: EntityConfig<any>[];
	systems: SystemCreateFunction[];
};

export type EntityConfig<T> = {
	func: EntityCreateFunc<T>;
	data: T;
};

export type EntityCreateFunc<T> = (world: IWorld, data: T) => number;
