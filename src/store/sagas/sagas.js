import {
	DOWN,
	LEFT,
	MOVE_DOWN,
	MOVE_LEFT,
	MOVE_RIGHT,
	MOVE_UP,
	RESET,
	RIGHT,
	STOP_GAME,
	UP,
	setDisDirection
} from '../actions/actions';
import { delay, put, takeLatest } from 'redux-saga/effects';

export function* watcherSaga() {
	yield takeLatest(
		[MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, RESET, STOP_GAME],
		moveSaga
	);
}

export function* moveSaga(params) {
	while (params.type !== RESET && params.type !== STOP_GAME) {
		//dispatches movement actions
		yield put({
			type: params.type.split('_')[1],
			payload: params.payload
		});

		//Dispatches SET_DIS_DIRECTION action
		switch (params.type.split('_')[1]) {
			case RIGHT:
				yield put(setDisDirection(LEFT));
				break;

			case LEFT:
				yield put(setDisDirection(RIGHT));
				break;

			case UP:
				yield put(setDisDirection(DOWN));
				break;

			case DOWN:
				yield put(setDisDirection(UP));
				break;
		}
		yield delay(200);
	}
}
