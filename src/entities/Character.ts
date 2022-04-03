import { EntityCreateFunc } from '~/types';
import { addComponent, addEntity } from 'bitecs';
import { Utils } from '~/utils';
import PositionComponent from '~/components/Position';
import SpriteComponent from '~/components/Sprite';
import MovementComponent from '~/components/Movement';
import { FLIP_STATE } from '~/enums/FlipState';
import { DIRECTIONS } from '~/enums/Directions';
import { CharacterTex } from '~/enums/CharacterTextures';

export type CharacterData = {
	x: number;
	y: number;
	z: number;
	pivotX: number,
	pivotY: number,
	texture: CharacterTex;
	speed: number;
};

const Character: EntityCreateFunc<CharacterData> = (world, data) => {
	const { x, y, z, texture, speed, pivotX, pivotY } = data;
	const eid = addEntity(world);

	addComponent(world, PositionComponent, eid);
	addComponent(world, SpriteComponent, eid);
	addComponent(world, MovementComponent, eid);

	PositionComponent.x[eid] = x;
	PositionComponent.y[eid] = y;
	PositionComponent.z[eid] = z;

	SpriteComponent.pivotX[eid] = pivotX;
	SpriteComponent.pivotY[eid] = pivotY;
	SpriteComponent.texture[eid] = Utils.getEnumStringValueIndex(CharacterTex, texture);
	SpriteComponent.flipX[eid] = FLIP_STATE.NO_FLIP;

	MovementComponent.speed[eid] = speed;
	MovementComponent.direction[eid] = DIRECTIONS.NONE;

	return eid;
};

export default Character;
