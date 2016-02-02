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

				return {
					rolls: this._displayRollsFrom({ frame }),
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

	_displayRollsFrom({frame}) {
		return isSpare(frame) ? this._displaySpare({ rolls: frame.rolls })
			: isStrike(frame) ? this._displayStrike({ rolls: frame.rolls })
				: _(frame.rolls).map(roll => roll.toString()).value();
	}

	_displaySpare({rolls}) {
		return _(rolls).map((roll, index) => index % 2 === 0 ? roll.toString() : '/').value()
	}

	_displayStrike({rolls}) {
		return rolls.length === 1 ? [' ', 'X'] : _(rolls).map(roll => roll === 10 ? 'X' : roll.toString()).value();
	}
}