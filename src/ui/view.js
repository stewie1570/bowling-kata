import _ from 'lodash';

var minWidth = (str, pad, length) => str + Array(length - str.length).join(pad);

export var view = {
	render: gameViewModel => {
        var border = "=====================================================================================";
		console.log(border);
		console.log(`|${
			minWidth(_(gameViewModel.frames)
				.flatMap(frame => frame.rolls)
				.value()
				.join(' | '), ' ', border.length - 1)
		}|`);
		console.log(`|${
			minWidth(_(gameViewModel.frames)
				.map((frame, index) => `       ${frame.total || ''}`.slice(index === 9 ? -7 : -5))
				.value()
				.join(' | '), ' ', border.length - 1)
		}|`);
		console.log(border);
	}
}