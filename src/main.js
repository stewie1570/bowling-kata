import {DelimitedStringBowlingScoreCardParser} from './parsing';
import {BowlingScoreBoard} from './scoring';

global.process = global.process || { argv: [] };

var frames = new DelimitedStringBowlingScoreCardParser()
    .unScoredFramesFrom({ delimitedScores: global.process.argv[2] });
var scoredGame = new BowlingScoreBoard().scoredGameFrom({ frames });

console.log(`Test: "${JSON.stringify(scoredGame) }".`);