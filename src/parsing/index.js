import _ from 'lodash';

export class BowlingScoreCardParser {
    parse({delimitedScores}) {
        if (delimitedScores.indexOf('|') < 0)
            throw new Error(`No pipe delimited frames in "${delimitedScores}".`);

        var frameStrings = delimitedScores.split('|');

        var frames = _(frameStrings)
            .map(frameString => {
                return {
                    rolls: this._rollsFrom({ frameString })
                };
            })
            .value();
            
        if(_(frames).take(9).some(frame => frame.rolls.length > 2))
            throw new Error(`Can't have more than 2 rolls per frame.`);
            
        return frames;
    }

    _rollsFrom({frameString}) {
        if (frameString.indexOf(',') < 0)
            throw new Error(`No comma delimited rolls in "${frameString}".`);

        var toIntegerRoll = stringRoll => {
            var val = parseInt(stringRoll);
            if (Number.isNaN(val))
                throw new Error(`Rolls need to be integers. "${stringRoll}" is not.`);
            return val;
        };

        return _(frameString.split(',')).map(toIntegerRoll).value()
    }
}