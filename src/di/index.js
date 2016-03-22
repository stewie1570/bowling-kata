import {DelimitedStringBowlingScoreCardParser} from '../parsing';
import {BowlingScoreBoard} from '../scoring';
import {view} from '../ui/view';
import {Ioc} from 'javascript-ioc';
import {GameProvider} from '../providers/gameProvider';

export var ioc = new Ioc();

ioc.bind("view", { to: view });
ioc.bind("scorer", { to: BowlingScoreBoard });
ioc.bind("parser", { to: DelimitedStringBowlingScoreCardParser });
ioc.bind("userInput", { toMethod: () => global.process.argv[2] });
ioc.bind("gameProvider", { to: GameProvider });