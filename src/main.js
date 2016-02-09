import {ioc} from './di';
import {BowlingGameController} from './ui/controller';

ioc.get(BowlingGameController).showGame();