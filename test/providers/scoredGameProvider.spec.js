import { GameProvider } from '../../src/providers/gameProvider';

describe('Game Provider', () => {
	it('Provides a scored game from user input', () => {
		//Arrange
		var userInput = 'user input';
		var parser = {
			unScoredFramesFrom: ({delimitedScores}) => delimitedScores === 'user input'
				? 'unscored frames'
				: '(parser received wrong input)'
		};
		var scorer = {
			scoredGameFrom: ({frames}) => frames === 'unscored frames'
				? 'scored game'
				: '(scorer received wrong input)'
		};
		var gameProvider = new GameProvider({ userInput, parser, scorer }); 
		
		//Act
		var game = gameProvider.getGame();
		
		//Assert
		expect(game).to.equal('scored game');
	});
});