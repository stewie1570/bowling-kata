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
		return _(game.frames)
			.map((frame, frameIndex) => {
				var futureRollsCount = _(game.frames)
					.takeRight(game.frames.length - frameIndex - 1)
					.flatMap(frame => frame.rolls)
					.value()
					.length;

				var rolls = _(frame.rolls)
					.map((roll, rollIndex) => rollIndex % 2 === 0 || (rollIndex > 0 && frame.rolls[rollIndex - 1] === 10)
						? (roll === 10 ? 'X' : roll.toString())
						: (_(frame.rolls).take(rollIndex + 1).sum() === 10 ? '/' : roll.toString()))
					.value();
				var strikeFormattedRolls = rolls.length === 1 && rolls[0] === 'X' ? [' ', 'X'] : rolls;

				return {
					rolls: strikeFormattedRolls,
					total: frameIndex === 9 ? game.total : this._isMissingBonusRolls({ frame, futureRollsCount })
						? undefined
						: _(game.frames)
							.map(frame => frame.total)
							.take(frameIndex + 1)
							.sum()
				}
			})
			.value()
	}

	_isMissingBonusRolls({frame, futureRollsCount}) {
		return (isSpare(frame) && futureRollsCount < 1) || (isStrike(frame) && futureRollsCount < 2);
	}
}