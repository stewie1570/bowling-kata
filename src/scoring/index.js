import _ from 'lodash';
import {mapRight} from '../utilities';

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
        var isStrike = frame => frame.rolls.length == 1 && frame.total == 10;
        var isSpare = frame => frame.rolls.length > 1 && frame.total == 10;

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