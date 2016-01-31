export var isStrike = frame => frame.rolls.length == 1 && frame.total == 10;
export var isSpare = frame => frame.rolls.length > 1 && frame.total == 10;
