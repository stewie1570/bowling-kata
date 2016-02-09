import {DelimitedStringBowlingScoreCardParser} from './parsing';
import {BowlingScoreBoard} from './scoring';
import {BowlingGameController} from './ui/controller';
import {view} from './ui/view';
import {Ioc} from 'javascript-ioc';
import {GameProvider} from './providers/gameProvider';

var ioc = new Ioc();

global.process = global.process || { argv: [] };

ioc.bind("view", { to: view });
ioc.bind("scorer", { to: BowlingScoreBoard });
ioc.bind("parser", { to: DelimitedStringBowlingScoreCardParser });
ioc.bind("userInput", { toConstant: () => global.process.argv[2] });
ioc.bind("gameProvider", { to: GameProvider });

ioc.get(BowlingGameController).showGame();