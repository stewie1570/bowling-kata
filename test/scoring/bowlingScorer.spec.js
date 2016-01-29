import { BowlingScoreBoard } from '../../src/scoring';

describe('Bowling Scoring', () => {
	var scorer;

	beforeEach(() => scorer = new BowlingScoreBoard())

	it('should sub-total all frames and grand total the game', () => {
		var scoreBoard = scorer
			.scoredGameFrom({
				frames: [
					{ rolls: [1, 2] },
					{ rolls: [2, 5] },
					{ rolls: [3, 1] }
				]
			});
		
		var expectedBoard = {
			total: 14,
			frames: [
                { rolls: [1, 2], total: 3 },
                { rolls: [2, 5], total: 7 },
                { rolls: [3, 1], total: 4 }
            ]
		};
		
		expect(scoreBoard).to.deep.equal(expectedBoard);
	});
});