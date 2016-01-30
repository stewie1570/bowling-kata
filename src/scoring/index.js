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
            
        var isStrick = frame => frame.rolls.length == 1 && frame.total == 10;
        var isSpare = frame => frame.rolls.length > 1 && frame.total == 10;

        var bonusTotalledFrames = _(totalledFrames)
            .zipWith(_(totalledFrames).takeRight(totalledFrames.length - 1).value(), (left, right) => {
                // return {
                //     rolls: left.rolls,
                //     total: left.total + (left.total == 10
                //         ? left.rolls.length == 1 ? right.total : _(right.rolls).first()
                //         : 0)
                // }
                return {
                    rolls: left.rolls,
                    total: left.total
                        + ((isStrick(left) && right && right.total) || 0)
                        + ((isSpare(left) && right && _(right.rolls).first()) || 0)
                }
            })
            .value();
        
        return {
            total: _(bonusTotalledFrames).map(frame => frame.total).sum(),
            frames: bonusTotalledFrames
        };
    }
}