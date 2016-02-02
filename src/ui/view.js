import _ from 'lodash';

var minWidth = (str, pad, length) => str + Array(length - str.length).join(pad);

export var view = {
	render: gameViewModel => {
        var border = "==============================================";
		console.log(border);
		console.log(`|${
			minWidth(_(gameViewModel.frames)
				.flatMap(frame => frame.rolls)
				.value()
				.join('|'), ' ', border.length - 2)
		}|`);
		console.log(`|${
			minWidth(_(gameViewModel.frames)
				.map((frame, index) => `     ${frame.total || ''}`.slice(index === 9 ? -5 : -3))
				.value()
				.join('|'), ' ', border.length - 2)
		}|`);
		console.log(border);
	}
}