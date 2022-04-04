// https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import 'regenerator-runtime/runtime';
import '~/styles/main.scss';

import 'phaser';
import Loader from '~/scenes/Loader';
import Stage1 from '~/scenes/Stage1';
import Stage2 from '~/scenes/Stage2';
import Stage3 from '~/scenes/Stage3';
import Stage4 from '~/scenes/Stage4';
import Intro from '~/scenes/Intro';
import Start from '~/scenes/Start';

const config = {
	type: Phaser.AUTO,
	backgroundColor: '#422531',
	width: 640 * 0.75,
	height: 360 * 0.75,
	scene: [Loader, Intro, Start, Stage1, Stage2, Stage3, Stage4],
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
};

new Phaser.Game(config);
