import {ioc} from './di';
import {BowlingGameController} from './ui/controller';

ioc.get(BowlingGameController).showGame();

console.log(JSON.stringify(ioc.getDependencyGraphOf(BowlingGameController), null, '\t'));