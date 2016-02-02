import _ from 'lodash';

export var view = {
	render: gameViewModel => {
		console.log("===========================================");
		console.log(`|${
			_(gameViewModel.frames)
				.flatMap(frame => frame.rolls)
				.value()
				.join('|')
		}|`);
		console.log(`|${
			_(gameViewModel.frames)
				.map((frame, index) => `     ${frame.total || ''}`.slice(index === 9 ? -5 : -3))
				.value()
				.join('|')
		}|`);
		console.log("===========================================");
	}
}