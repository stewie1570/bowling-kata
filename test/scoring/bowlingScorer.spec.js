import { BowlingScoreBoard } from '../../src/scoring';
import _ from 'lodash';

describe('Scoring', () => {
    var scorer;

    beforeEach(() => scorer = new BowlingScoreBoard())

    it('should sub-total all frames and grand total the game', () => {
        var scoreBoard = scorer
            .scoredGameFrom({
                unscoredFrames: [
                    { rolls: [1, 2] },
                    { rolls: [2, 5] },
                    { rolls: [3, 1] }
                ]
            });

        expect(scoreBoard).to.deep.equal({
            total: 14,
            frames: [
                { rolls: [1, 2], total: 3 },
                { rolls: [2, 5], total: 7 },
                { rolls: [3, 1], total: 4 }
            ]
        });
    });

    describe('Perfect Game', () => {
        it('should total 300', () => {
            var scoreBoard = scorer
                .scoredGameFrom({
                    unscoredFrames: [
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10] },
                        { rolls: [10, 10, 10] }
                    ]
                });

            expect(scoreBoard.total).to.equal(300);
            expect(scoreBoard.frames).to.deep.equal([
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
                { rolls: [10, 10, 10], total: 30 },
            ]);
        });
    });

    describe('Spare', () => {
        it('should add bonus of the next roll on frames scoring a spare', () => {
            var scoreBoard = scorer
                .scoredGameFrom({
                    unscoredFrames: [
                        { rolls: [1, 9] },
                        { rolls: [2, 5] },
                        { rolls: [3, 1] }
                    ]
                });

            expect(scoreBoard.total).to.equal(23);
            expect(scoreBoard.frames).to.deep.equal([
                { rolls: [1, 9], total: 12 },
                { rolls: [2, 5], total: 7 },
                { rolls: [3, 1], total: 4 }
            ]);
        });

        it('should total balls rolled without bonus when bonus rolls have not been rolled yet', () => {
            var scoreBoard = scorer
                .scoredGameFrom({
                    unscoredFrames: [
                        { rolls: [1, 5] },
                        { rolls: [1, 9] }
                    ]
                });

            expect(scoreBoard.total).to.equal(16);
            expect(scoreBoard.frames).to.deep.equal([
                { rolls: [1, 5], total: 6 },
                { rolls: [1, 9], total: 10 }
            ]);
        });
    });

    describe('Strike', () => {

        it('should add bonus of the next two rolls on frames scoring a strike', () => {
            var scoreBoard = scorer
                .scoredGameFrom({
                    unscoredFrames: [
                        { rolls: [1, 5] },
                        { rolls: [10] },
                        { rolls: [3, 1] }
                    ]
                });

            expect(scoreBoard.total).to.equal(24);
            expect(scoreBoard.frames).to.deep.equal([
                { rolls: [1, 5], total: 6 },
                { rolls: [10], total: 14 },
                { rolls: [3, 1], total: 4 }
            ]);
        });

        it('should not score [0,10] as a strike', () => {
            var scoreBoard = scorer
                .scoredGameFrom({
                    unscoredFrames: [
                        { rolls: [0, 10] },
                        { rolls: [1, 9] },
                        { rolls: [3, 1] }
                    ]
                });
            
            expect(scoreBoard.total).to.equal(28);
            expect(scoreBoard.frames).to.deep.equal([
                { rolls: [0, 10], total: 11 },
                { rolls: [1, 9], total: 13 },
                { rolls: [3, 1], total: 4 }
            ]);
        });

        it('should total balls rolled without bonus when bonus rolls have not been rolled yet', () => {
            var scoreBoard = scorer
                .scoredGameFrom({
                    unscoredFrames: [
                        { rolls: [1, 5] },
                        { rolls: [10] }
                    ]
                });

            expect(scoreBoard.total).to.equal(16);
            expect(scoreBoard.frames).to.deep.equal([
                { rolls: [1, 5], total: 6 },
                { rolls: [10], total: 10 }
            ]);
        });
    });
});