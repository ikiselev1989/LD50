import { GameObjects } from 'phaser';

import { SystemCreateFunction } from '~/types';
import { defineQuery, defineSystem } from 'bitecs';
import PositionComponent from '~/components/Position';
import SpriteComponent from '~/components/Sprite';
import { CHARACTER_TEXTURES } from '~/enums/CharacterTextures';

const Render: SystemCreateFunction = scene => {
	const sprites = new Map<number, GameObjects.Sprite>();
	const query = defineQuery([PositionComponent, SpriteComponent]);

	function addSprite(eid) {
		const textures = Object.keys(CHARACTER_TEXTURES).map(tex => CHARACTER_TEXTURES[tex]);
		const sprite = scene.add.sprite(
			PositionComponent.x[eid],
			PositionComponent.y[eid],
			textures[SpriteComponent.texture[eid]],
		);

		sprites.set(eid, sprite);

		scene.addEntitiesRender(eid, sprite);

		return sprite;
	}

	function getSprite(eid): GameObjects.Sprite {
		return !sprites.has(eid) ? addSprite(eid) : (sprites.get(eid) as GameObjects.Sprite);
	}

	return defineSystem(world => {
		let entities = query(world);

		for (let i = 0; i < entities.length; ++i) {
			let eid = entities[i];

			const sprite = getSprite(eid);

			sprite.x = PositionComponent.x[eid];
			sprite.y = PositionComponent.y[eid];
			sprite.z = PositionComponent.z[eid];

			sprite.flipX = !!SpriteComponent.flipX[eid];
		}

		return world;
	});
};

export default Render;
