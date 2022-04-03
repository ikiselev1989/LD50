// https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import 'regenerator-runtime/runtime';
import '~/styles/main.scss';

import 'phaser';
import Playground from '~/scenes/Playground';
import Loader from '~/scenes/Loader';
import * as Phaser from 'phaser';

const config = {
	type: Phaser.AUTO,
	backgroundColor: '#422531',
	width: 640 * 0.75,
	height: 360 * 0.75,
	scene: [Loader, Playground],
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
