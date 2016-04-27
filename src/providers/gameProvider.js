export class GameProvider {
	constructor({userInput, parser, scorer}) {
		this.userInput = userInput;
		this.parser = parser;
		this.scorer = scorer;
	}

	getGame() {
		var unscoredFrames = this.parser.unScoredFramesFrom({ delimitedScores: this.userInput });

		return this.scorer.scoredGameFrom({ unscoredFrames });
	}
}

GameProvider.prototype.dependencies = [["userInput", "parser", "scorer"]];