import _ from 'lodash';

var padRight = (str, pad, length) => str.length > length ? str : str + Array(length - str.length).join(pad);
var padLeft = (str, pad, length) => str.length > length ? str : Array(length - str.length).join(pad) + str;

export var view = {
	render: gameViewModel => {
        var border = "=====================================================================================";
		console.log(border);
		console.log(`| ${
			padRight(_(gameViewModel.frames)
				.flatMap(frame => frame.rolls)
				.value()
				.join(' | '), ' ', border.length - 2)
		}|`);
		console.log("|   ----|   ----|   ----|   ----|   ----|   ----|   ----|   ----|   ----|   --------|");
		console.log(`| ${
			padRight(_(gameViewModel.frames)
				.map((frame, index) => padLeft(`${frame.total || ''}`, ' ', index === 9 ? 10 : 6))
				.value()
				.join(' | '), ' ', border.length - 2)
		}|`);
		console.log(border);
	}
}