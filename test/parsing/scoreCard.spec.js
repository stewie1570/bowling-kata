import { BowlingScoreCardParser } from '../../src/parsing';

describe('Score Card Parsing', () => {
    var parser;

    beforeEach(() => parser = new BowlingScoreCardParser());

    it('should parse comma/pipe delimited rolls and frames', () => {
        var results = parser.parse({ delimitedScores: '1,2|2,5|8,1' });
        expect(results).to.deep.equal([
            { rolls: [1, 2] },
            { rolls: [2, 5] },
            { rolls: [8, 1] }
        ]);
    });
});