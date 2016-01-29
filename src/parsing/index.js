import _ from 'lodash';

export class BowlingScoreCardParser {
    parse({delimitedScores}) {
        if (delimitedScores.indexOf('|') < 0)
            throw new Error(`No pipe delimited frames in "${delimitedScores}".`);

        var frameStrings = delimitedScores.split('|');

        return _(frameStrings)
            .map(frameString => {
                return {
                    rolls: this._rollsFrom({ commaDelimitedString: frameString })
                };
            })
            .value();
    }

    _rollsFrom({commaDelimitedString}) {
        if(commaDelimitedString.indexOf(',') < 0)
            throw new Error(`No comma delimited rolls in "${commaDelimitedString}".`);
        
        return _(commaDelimitedString.split(','))
            .map(roll => parseInt(roll))
            .value()
    }
}