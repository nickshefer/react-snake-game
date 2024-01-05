export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';

export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export const INCREMENT_SCORE = 'INCREMENT_SCORE'; //action
export const INCREASE_SNAKE = 'INCREASE_SNAKE';

export const RESET_SCORE = 'RESET_SCORE'; //action
export const RESET = 'RESET'; //action

export const SET_DIS_DIRECTION = 'SET_DIS_DIRECTION';

export const STOP_GAME = 'STOP_GAME'; //action

export const makeMove = (dx, dy, move) => ({
	type: move,
	payload: [dx, dy]
});

export const setDisDirection = direction => ({
	type: SET_DIS_DIRECTION,
	payload: direction
});

export const increaseSnake = () => ({
	//action creator
	type: INCREASE_SNAKE
});

export const scoreUpdates = type => ({
	type
});

//action creator
export const stopGame = () => ({
	type: STOP_GAME
});

export const resetGame = () => ({
	type: RESET
});
