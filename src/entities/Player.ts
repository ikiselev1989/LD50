import { addComponent } from 'bitecs';
import { EntityCreateFunc } from '~/types';
import Character, { CharacterData } from '~/entities/Character';
import PlayerInputComponent from '../components/PlayerInput';
import CameraFollowComponent from '~/components/CameraFollow';

const Player: EntityCreateFunc<CharacterData> = (world, data) => {
	const eid = Character(world, data);

	addComponent(world, PlayerInputComponent, eid);
	addComponent(world, CameraFollowComponent, eid);

	return eid;
};

export default Player;
