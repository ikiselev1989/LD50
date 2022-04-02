import { SystemCreateFunction } from '~/types';
import { defineQuery, defineSystem } from 'bitecs';
import PlayerInputComponent from '~/components/PlayerInput';
import MovementComponent from '~/components/Movement';
import { DIRECTIONS } from '~/enums/Directions';

const PlayerInput: SystemCreateFunction = scene => {
	const query = defineQuery([MovementComponent, PlayerInputComponent]);

	return defineSystem(world => {
		const entities = query(world);
		const { left, right, space } = scene.cursors;

		for (let i = 0; i < entities.length; ++i) {
			const eid = entities[i];

			if (left.isDown) {
				MovementComponent.direction[eid] = DIRECTIONS.LEFT;
			}

			if (right.isDown) {
				MovementComponent.direction[eid] = DIRECTIONS.RIGHT;
			}

			if ((!left.isDown && !right.isDown) || (left.isDown && right.isDown)) {
				MovementComponent.direction[eid] = DIRECTIONS.NONE;
			}
		}

		return world;
	});
};

export default PlayerInput;
