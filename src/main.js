import {ioc} from './di';
import {BowlingGameController} from './ui/controller';

ioc.get(BowlingGameController).showGame();

console.log("And here is the dependency graph...just because :)");
console.log(JSON.stringify(ioc.getDependencyGraphOf(BowlingGameController), null, '\t'));