import _ from 'lodash';
import {isStrike, isSpare} from '../scoring/bonus-rules';

export class BowlingGameController {
	constructor({view}) {
		this.view = view;
	}

	showGame({game}) {
		var gameViewModel = {
			frames: _(game.frames)
				.map((frame, frameIndex) => {
					return {
						rolls: this._displayRollsFrom({ frame }),
						total: (isSpare(frame) && frameIndex == game.frames.length - 1)
							? undefined
							: _(game.frames)
								.map(frame => frame.total)
								.take(frameIndex + 1)
								.sum()
					}
				})
				.value()
		};

		this.view.render(gameViewModel);
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
		return rolls.length === 1 ? ['', 'X'] : _(rolls).map(roll => 'X').value();
	}
}