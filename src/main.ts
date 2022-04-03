// https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import 'regenerator-runtime/runtime';
import '~/styles/main.scss';

import 'phaser';
import Loader from '~/scenes/Loader';
import Stage1 from '~/scenes/Stage1';
import Stage2 from '~/scenes/Stage2';

const config = {
	type: Phaser.AUTO,
	backgroundColor: '#422531',
	width: 640 * 0.75,
	height: 360 * 0.75,
	scene: [Loader, Stage1, Stage2],
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
};

new Phaser.Game(config);
