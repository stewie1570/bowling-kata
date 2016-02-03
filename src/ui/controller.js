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
		var completedFormattedFrames = _(game.frames)
			.map((frame, frameIndex) => this._toCompleteFormatedFrameFrom({ game, frame, frameIndex }))
			.value();

		return completedFormattedFrames.concat(this._emptyFrames({
			count: 10 - completedFormattedFrames.length,
			gameTotal: game.total
		}));
	}

	_emptyFrames({count, gameTotal}) {
		var isTenthFrame = ({index, count}) => index === count - 1;

		return _(Array(count))
			.map((x, index) => isTenthFrame({ index, count })
				? { rolls: [' ', ' ', ' '], total: gameTotal }
				: { rolls: [' ', ' '] })
			.value()
	}

	_toCompleteFormatedFrameFrom({game, frame, frameIndex}) {
		var futureRollsCount = _(game.frames)
			.takeRight(game.frames.length - frameIndex - 1)
			.flatMap(frame => frame.rolls)
			.value()
			.length;

		return {
			rolls: this._displayRollsIn({ frame, frameIndex }),
			total: frameIndex === 9 ? game.total : this._isIncompleteFrame({ frame, futureRollsCount })
				? undefined
				: _(game.frames)
					.map(frame => frame.total)
					.take(frameIndex + 1)
					.sum()
		}
	}

	_displayRollsIn({frame, frameIndex}) {
		var emptyRolls = ({count}) => _(Array(count)).map(x => ' ').value();
		var formattedRolls = this._formattedRollsFrom({ frame, frameIndex });
		var expectedRollCountForFrame = frameIndex < 9 ? 2 : 3;

		return formattedRolls.length < expectedRollCountForFrame
			? formattedRolls.concat(emptyRolls({ count: expectedRollCountForFrame - formattedRolls.length }))
			: formattedRolls;
	}

	_formattedRollsFrom({frame, frameIndex}) {
		var rolls = _(frame.rolls)
			.map((roll, rollIndex) => this._isStrikePossibleFor({ rollIndex, previousRoll: frame.rolls[rollIndex - 1] })
				? (roll === 10 ? 'X' : roll.toString())
				: (_(frame.rolls).take(rollIndex + 1).sum() === 10 ? '/' : roll.toString()))
			.map(charRoll => charRoll == '0' ? '-' : charRoll)
			.value();
		return frameIndex < 9 && rolls[0] === 'X' ? [' ', 'X'] : rolls;
	}

	_isStrikePossibleFor({rollIndex, previousRoll}) {
		return rollIndex % 2 === 0 || (rollIndex > 0 && previousRoll === 10);
	}

	_isIncompleteFrame({frame, futureRollsCount}) {
		return (!isStrike(frame) && frame.rolls.length < 2) || this._isMissingBonusRolls({ frame, futureRollsCount });
	}

	_isMissingBonusRolls({frame, futureRollsCount}) {
		return (isSpare(frame) && futureRollsCount < 1) || (isStrike(frame) && futureRollsCount < 2);
	}
}