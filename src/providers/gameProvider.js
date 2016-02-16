export class GameProvider {
	constructor({userInput, parser, scorer}) {
		this.userInput = userInput;
		this.parser = parser;
		this.scorer = scorer;
	}

	getGame() {
		var frames = this.parser.unScoredFramesFrom({ delimitedScores: this.userInput() });

		return this.scorer.scoredGameFrom({ frames });
	}
}

GameProvider.prototype.dependencies = [["userInput", "parser", "scorer"]];