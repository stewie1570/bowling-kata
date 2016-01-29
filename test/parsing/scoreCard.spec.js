import { BowlingScoreCardParser } from '../../src/parsing';

describe('Score Card Parser', () => {
    var parser;

    beforeEach(() => parser = new BowlingScoreCardParser());

    describe('Parsing', () => {
        it('should parse comma/pipe delimited rolls and frames', () => {
            var results = parser.parse({ delimitedScores: '1,2|2,5|8,1' });
            expect(results).to.deep.equal([
                { rolls: [1, 2] },
                { rolls: [2, 5] },
                { rolls: [8, 1] }
            ]);
        });
    });
    
    describe('Error Handling', () => {
        it('should throw when no frames', () => {
            var exceptionMessage = '';
            try{
                parser.parse({delimitedScores: 'blah'});
            }
            catch(ex){
                exceptionMessage = ex.message;
            }
            
            expect(exceptionMessage).to.equal('No pipe delimited frames in "blah".');
        });
        
        it('should throw when no rolls', () => {
            var exceptionMessage = '';
            try{
                parser.parse({delimitedScores: 'blah|blah'});
            }
            catch(ex){
                exceptionMessage = ex.message;
            }
            
            expect(exceptionMessage).to.equal('No comma delimited rolls in "blah".');
        });
    });
});