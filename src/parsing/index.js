import _ from 'lodash';

export class BowlingScoreCardParser {
    parse({delimitedScores}) {
        var frames = delimitedScores.split('|');

        return _(frames)
            .map(frame => {
                return {
                    rolls: _(frame.split(',')).map(roll => parseInt(roll)).value()
                };
            })
            .value();
    }
}