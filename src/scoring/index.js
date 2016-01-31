import _ from 'lodash';

export class BowlingScoreBoard {
    scoredGameFrom({frames}) {
        var totalledFrames = _(frames)
            .map(frame => {
                return {
                    rolls: frame.rolls,
                    total: _(frame.rolls).sum()
                };
            })
            .value();

        var isStrike = frame => frame.rolls.length == 1 && frame.total == 10;
        var isSpare = frame => frame.rolls.length > 1 && frame.total == 10;

        var i = 1;
        var restOfFramesMatrix = _(totalledFrames)
            .map(frame => _(totalledFrames).takeRight(totalledFrames.length - i++))
            .value();
        var totalledFramesWithNextTwoRolls = _(totalledFrames)
            .zipWith(restOfFramesMatrix, (current, rest) => {
                return {
                    rolls: current.rolls,
                    total: current.total,
                    nextTwoRolls: current.rolls.length === 3
                        ? _(current.rolls).takeRight(2).value()
                        : _(rest).flatMap(frame => frame.rolls).take(2).value()
                };
            })
            .value();

        var bonusTotalledFrames = _(totalledFramesWithNextTwoRolls)
            .map(frame => {
                return {
                    rolls: frame.rolls,
                    total: frame.total
                    + ((isStrike(frame) && _(frame.nextTwoRolls).sum()) || 0)
                    + ((isSpare(frame) && _(frame.nextTwoRolls).first()) || 0)
                };
            })
            .value();

        return {
            total: _(bonusTotalledFrames).map(frame => frame.total).sum(),
            frames: bonusTotalledFrames
        };
    }
}