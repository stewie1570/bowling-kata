import _ from 'lodash';

export class DelimitedStringBowlingScoreCardParser {
    unScoredFramesFrom({delimitedScores}) {
        var frameStrings = delimitedScores.split('|');

        var frames = _(frameStrings)
            .map(frameString => ({ rolls: this._rollsFrom({ frameString }) }))
            .value();

        this._validateLengthsAndTotalsIn({ frames });

        return frames;
    }

    _rollsFrom({frameString}) {
        var toIntegerRoll = stringRoll => {
            var val = parseInt(stringRoll);
            if (Number.isNaN(val))
                throw new Error(`Rolls need to be integers. "${stringRoll}" is not.`);
            return val;
        };

        return _(frameString.split(',')).map(toIntegerRoll).value()
    }

    _validateLengthsAndTotalsIn({frames}) {
        if (frames.length > 10)
            throw new Error('Can\'t have more than 10 frames.');

        if (_(frames).take(9).some(frame => frame.rolls.length > 2))
            throw new Error('Can\'t have more than 2 rolls per frame.');

        if (_(frames).take(9).some(frame => _(frame.rolls).sum() > 10))
            throw new Error('Can\'t have a frame total more than 10 before the 10th frame.');

        if (_(frames).last().rolls.length > 3)
            throw new Error('Can\'t have more than three rolls in 10th frame.');
            
        if(frames.length === 10 && _(frames[9].rolls).take(2).sum() < 10 && frames[9].rolls.length > 2)
            throw new Error('Can\'t have more than two rolls in 10th frame when it\'s not a strike or spare.');

        if (_(_(frames).last().rolls).sum() > 30)
            throw new Error('10th frame cant have a frame total more than 30.');
    }
}