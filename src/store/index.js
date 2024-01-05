import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { gameReducer } from './reducers/gameReducer';
import { watcherSaga } from './sagas/sagas';
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(gameReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSaga);
