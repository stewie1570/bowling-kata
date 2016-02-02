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
				.map(frame => `   ${frame.total || ''}`.slice(-3))
				.value()
				.join('|')
		}|`);
		console.log("===========================================");
	}
}