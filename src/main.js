import {BowlingScoreCardParser} from './parsing';

global.process = global.process || { argv: [] };

console
	.log(`Test: "${
		JSON.stringify(new BowlingScoreCardParser().parse({ delimitedScores: global.process.argv[2] }))
		}".`);