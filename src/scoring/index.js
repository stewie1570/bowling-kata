import _ from 'lodash';
import {mapRight} from '../utilities';
import {isStrike, isSpare} from './bonus-rules';

export class BowlingScoreBoard {
    scoredGameFrom({frames}) {
        var subTotalledFrames = _(frames)
            .map(frame => {
                return {
                    rolls: frame.rolls,
                    total: _(frame.rolls).sum()
                };
            })
            .value();

        var bonusAdjustedFrames = this._bonusAdjustedFramesFrom({ subTotalledFrames });

        return {
            total: _(bonusAdjustedFrames).map(frame => frame.total).sum(),
            frames: bonusAdjustedFrames
        };
    }

    _bonusAdjustedFramesFrom({subTotalledFrames}) {
        return _(this._framesContainingNextTwoRollsFrom({ subTotalledFrames }))
            .map(frame => {
                return {
                    rolls: frame.rolls,
                    total: frame.total
                    + ((isStrike(frame) && _(frame.nextTwoRolls).sum()) || 0)
                    + ((isSpare(frame) && _(frame.nextTwoRolls).first()) || 0)
                };
            })
            .value();
    }

    _framesContainingNextTwoRollsFrom({subTotalledFrames}) {
        return mapRight(subTotalledFrames, (currentFrame, framesAfterCurrent) => {
            return {
                rolls: currentFrame.rolls,
                total: currentFrame.total,
                nextTwoRolls: _(framesAfterCurrent).flatMap(frame => frame.rolls).take(2).value()
            };
        });
    }
}