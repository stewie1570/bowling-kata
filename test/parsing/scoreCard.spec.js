import { BowlingScoreCardParser } from '../../src/parsing';

describe('Score Card Parser', () => {
    var parser;

    beforeEach(() => parser = new BowlingScoreCardParser());

    describe('Parsing', () => {
        it('should parse comma/pipe delimited rolls and frames', () => {
            var results = parser.parse({ delimitedScores: '1,2|2,5|3,1|4,1|5,2|6,1|7,0|8,1|9,0|10,2,3' });
            expect(results).to.deep.equal([
                { rolls: [1, 2] },
                { rolls: [2, 5] },
                { rolls: [3, 1] },
                { rolls: [4, 1] },
                { rolls: [5, 2] },
                { rolls: [6, 1] },
                { rolls: [7, 0] },
                { rolls: [8, 1] },
                { rolls: [9, 0] },
                { rolls: [10, 2, 3] },
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
        
        it('should throw when rolls are not integers', () => {
            var exceptionMessage = '';
            try{
                parser.parse({delimitedScores: 'blah,blah|blah,blah'});
            }
            catch(ex){
                exceptionMessage = ex.message;
            }
            
            expect(exceptionMessage).to.equal('Rolls need to be integers. "blah" is not.');
        });
        
        it('cant have more than two rolls in first 9 frames', () => {
            var exceptionMessage = '';
            try{
                parser.parse({delimitedScores: '1,2|3,4,5|4,3|1,2,3'});
            }
            catch(ex){
                exceptionMessage = ex.message;
            }
            
            expect(exceptionMessage).to.equal('Can\'t have more than 2 rolls per frame.');
        });
    });
});