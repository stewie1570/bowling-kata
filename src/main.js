import {DelimitedStringBowlingScoreCardParser} from './parsing';

global.process = global.process || { argv: [] };

console
	.log(`Test: "${
		JSON.stringify(new DelimitedStringBowlingScoreCardParser().parse({ delimitedScores: global.process.argv[2] }))
		}".`);