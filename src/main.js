import {DelimitedStringBowlingScoreCardParser} from './parsing';
import {BowlingScoreBoard} from './scoring';
import {BowlingGameController} from './ui/controller';
import {view} from './ui/view';

global.process = global.process || { argv: [] };

var frames = new DelimitedStringBowlingScoreCardParser()
    .unScoredFramesFrom({ delimitedScores: global.process.argv[2] });

var scoredGame = new BowlingScoreBoard().scoredGameFrom({ frames });

new BowlingGameController({ view }).showGame({ game: scoredGame });