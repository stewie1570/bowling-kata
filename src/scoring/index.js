import _ from 'lodash';
import {mapRight} from '../utilities';

var isStrike = frame => _(frame.rolls).first() === 10;
var isSpare = frame => frame.rolls.length > 1 && _(frame.rolls).sum() >= 10;

export class BowlingScoreBoard {
    scoredGameFrom({unscoredFrames}) {
        var subTotalledFrames = _(unscoredFrames)
            .map(frame => ({ rolls: frame.rolls, total: _(frame.rolls).sum() }))
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