import _ from 'lodash';

var isStrike = frame => _(frame.rolls).some(roll => roll === 10);
var isSpare = frame => _(frame.rolls).every(roll => roll < 10) && frame.total >= 10;

export class BowlingGameController {
	constructor({view}) {
		this.view = view;
	}

	showGame({game}) {
		var gameViewModel = {
			frames: this._displayFramesFrom({ game })
		};

		this.view.render(gameViewModel);
	}

	_displayFramesFrom({game}) {
		var partialFrames = _(game.frames)
			.map((frame, frameIndex) => {
				var futureRollsCount = _(game.frames)
					.takeRight(game.frames.length - frameIndex - 1)
					.flatMap(frame => frame.rolls)
					.value()
					.length;

				return {
					rolls: this._displayRollsIn({ frame }),
					total: frameIndex === 9 ? game.total : this._isIncompleteFrame({ frame, futureRollsCount })
						? undefined
						: _(game.frames)
							.map(frame => frame.total)
							.take(frameIndex + 1)
							.sum()
				}
			})
			.value();
			
		return partialFrames
			.concat(_(Array(10 - partialFrames.length))
			.map((x, index) => index + partialFrames.length === 9
				? { rolls: [' ', ' ', ' '] }
				: { rolls: [' ', ' '] })
			.value());
	}

	_displayRollsIn({frame}) {
		var rolls = _(frame.rolls)
			.map((roll, rollIndex) => this._isStrikePossibleFor({ rollIndex, previousRoll: frame.rolls[rollIndex - 1] })
				? (roll === 10 ? 'X' : roll.toString())
				: (_(frame.rolls).take(rollIndex + 1).sum() === 10 ? '/' : roll.toString()))
			.value();
		var strikeFormattedRolls = rolls.length === 1 && rolls[0] === 'X' ? [' ', 'X'] : rolls;

		return strikeFormattedRolls;
	}

	_isStrikePossibleFor({rollIndex, previousRoll}) {
		return rollIndex % 2 === 0 || (rollIndex > 0 && previousRoll === 10);
	}
	
	_isIncompleteFrame({frame, futureRollsCount}){
		return (!isStrike(frame) && frame.rolls.length < 2) || this._isMissingBonusRolls({frame, futureRollsCount});
	}

	_isMissingBonusRolls({frame, futureRollsCount}) {
		return (isSpare(frame) && futureRollsCount < 1) || (isStrike(frame) && futureRollsCount < 2);
	}
}