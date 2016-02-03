import {BowlingGameController} from '../../src/ui/controller';
import _ from 'lodash';

describe('UI Controller', () => {
	var receivedViewModel, view, controller;
	
	beforeEach(() => {
		receivedViewModel;
		view = { render: vm => receivedViewModel = vm };
		controller = new BowlingGameController({ view });
	});
		
	it('should complete partial games with empty frames and running totals', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [1, 2], total: 3 },
                { rolls: [2, 5], total: 7 },
                { rolls: [3, 1], total: 4 }
            ],
			total: 14
		}});
		
		//Assert
		expect(_(receivedViewModel.frames).take(3).map(frame => frame.total).value())
			.to.deep.equal([3, 10, 14]);
		
		expect(receivedViewModel).to.deep.equal({
			frames: [
                { rolls: ['1', '2'], total: 3 },
                { rolls: ['2', '5'], total: 10 },
                { rolls: ['3', '1'], total: 14 },
				{ rolls: [' ', ' '] },
				{ rolls: [' ', ' '] },
				{ rolls: [' ', ' '] },
				{ rolls: [' ', ' '] },
				{ rolls: [' ', ' '] },
				{ rolls: [' ', ' '] },
				{ rolls: [' ', ' ', ' '], total: 14 }
            ]
		});
	});
	
	it('should not display total for spares that dont have their bonus rolls yet', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [1, 2], total: 3 },
                { rolls: [5, 5], total: 10 }
            ]
		}});
		
		//Assert
		expect(receivedViewModel.frames[1].total).to.be.undefined;
	});
	
	it('should not display total for strikes that dont have their bonus rolls yet', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [1, 2], total: 3 },
                { rolls: [10], total: 32 },
				{ rolls: [10], total: 42 },
				{ rolls: [10], total: 52 }
            ]
		}});
		
		//Assert
		var frameTotals = _(receivedViewModel.frames)
			.take(4)
			.map(frame => frame.total)
			.value();
		expect(frameTotals).to.deep.equal([3, 35, undefined, undefined]);
	});
	
	it('should not display total for incomplete frames', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [1, 2], total: 3 },
                { rolls: [3], total: 6 }
            ]
		}});
		
		//Assert
		var frameTotals = _(receivedViewModel.frames)
			.take(2)
			.map(frame => frame.total)
			.value();
		expect(frameTotals).to.deep.equal([3, undefined]);
	});
	
	it('should complete incomplete frames with empty rolls', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [1, 2], total: 3 },
                { rolls: [3], total: 6 }
            ]
		}});
		
		//Assert
		expect(receivedViewModel.frames[1].rolls).to.deep.equal(['3', ' ']);
	});
	
	it('should complete incomplete 10th frame with empty rolls', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [10], total: 30 },
                { rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [0], total: 0 },
            ]
		}});
		
		//Assert
		expect(receivedViewModel.frames[9].rolls).to.deep.equal(['0', ' ', ' ']);
	});
	
	it('should render spares with a forward slash', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [5, 5], total: 15 },
				{ rolls: [5, 5, 5], total: 15 },
				{ rolls: [0, 10], total: 10 }
            ]
		}});
		
		//Assert
		expect(receivedViewModel.frames[0].rolls).to.deep.equal(['5', '/']);
		expect(receivedViewModel.frames[1].rolls).to.deep.equal(['5', '/', '5']);
		expect(receivedViewModel.frames[2].rolls).to.deep.equal(['0', '/']);
	});
	
	it('should render strikes with an X', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
                { rolls: [10, 10, 9], total: 30 }
            ]
		}});
		
		//Assert
		expect(receivedViewModel.frames[0].rolls).to.deep.equal([' ', 'X']);
        expect(receivedViewModel.frames[9].rolls).to.deep.equal(['X', 'X', '9']);
	});
	
	it('first strike in tenth frame renders on the far left', () => {
		//Arrange
		//Act
		controller.showGame({game: {
			frames: [
                { rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 30 },
				{ rolls: [10], total: 10 }
            ]
		}});
		
		//Assert
		expect(receivedViewModel.frames[9].rolls).to.deep.equal(['X', ' ', ' ']);
	});
    
    it('final score should come from the game object', () => {
		//Arrange
		//Act
		controller.showGame({game: {
            total: 270,
			frames: [
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [10] },
                { rolls: [1, 9, 10] },
            ]
		}});
		
		//Assert
        expect(_(receivedViewModel.frames).last().total).to.equal(270);
	});
});