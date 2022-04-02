import { defineQuery, defineSystem } from 'bitecs';
import { SystemCreateFunction } from '~/types';
import CameraFollowComponent from '~/components/CameraFollow';
import SpriteComponent from '~/components/Sprite';
import * as Phaser from 'phaser';

const CameraFollow: SystemCreateFunction = scene => {
	const query = defineQuery([CameraFollowComponent, SpriteComponent]);

	return defineSystem((world) => {
		const entities = query(world);

		for (let i = 0; i < entities.length; ++i) {
			const eid = entities[i];

			const sprite = scene.getEntitiesRender(eid);

			scene.cameras.main.stopFollow();
			scene.cameras.main.startFollow(<Phaser.GameObjects.Sprite>sprite, true, 100, 0, 0, 75);
		}

		return world;
	});
};

export default CameraFollow;