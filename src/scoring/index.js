import _ from 'lodash';

export class BowlingScoreBoard {
	scoredGameFrom({frames}) {
		return {
			total: _(frames).flatMap(frame => frame.rolls).sum(),
			frames: _(frames)
				.map(frame => {
					return {
						rolls: frame.rolls,
						total: _(frame.rolls).sum()
					};
				})
				.value()
		};
	}
}