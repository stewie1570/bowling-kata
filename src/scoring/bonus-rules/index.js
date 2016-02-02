import _ from 'lodash';

export var isStrike = frame => _(frame.rolls).some(roll => roll === 10);
export var isSpare = frame => _(frame.rolls).every(roll => roll < 10) && frame.total >= 10;
