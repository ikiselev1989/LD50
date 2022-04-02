import { SystemCreateFunction } from '~/types';
import { defineQuery, defineSystem } from 'bitecs';
import PositionComponent from '~/components/Position';
import MovementComponent from '~/components/Movement';
import SpriteComponent from '~/components/Sprite';
import { FLIP_STATE } from '~/enums/FlipState';
import { DIRECTIONS } from '~/enums/Directions';

const Movement: SystemCreateFunction = scene => {
	const query = defineQuery([MovementComponent, PositionComponent, SpriteComponent]);

	return defineSystem(world => {
		const entities = query(world);

		for (let i = 0; i < entities.length; ++i) {
			const eid = entities[i];
			const speed = MovementComponent.speed[eid];

			switch (MovementComponent.direction[eid]) {
				case DIRECTIONS.LEFT:
					SpriteComponent.flipX[eid] = FLIP_STATE.FLIP;
					PositionComponent.x[eid] -= speed;
					break;

				case DIRECTIONS.RIGHT:
					SpriteComponent.flipX[eid] = FLIP_STATE.NO_FLIP;
					PositionComponent.x[eid] += speed;
					break;

				default:
					break;
			}
		}

		return world;
	});
};

export default Movement;
