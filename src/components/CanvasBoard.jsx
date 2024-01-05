import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearBoard,
	drawObject,
	generateRandomPosition,
	hasSnakeCollided
} from '../utils';
import {
	INCREMENT_SCORE,
	MOVE_DOWN,
	MOVE_LEFT,
	MOVE_RIGHT,
	MOVE_UP,
	RESET_SCORE,
	increaseSnake,
	makeMove,
	resetGame,
	scoreUpdates,
	stopGame
} from '../store/actions/actions';
import { Instruction } from './Instraction';

export default function CanvasBoard({ width, height }) {
	const dispatch = useDispatch();
	const canvasRef = useRef();
	const disallowedDirection = useSelector(state => state.disallowedDirection);
	const snake1 = useSelector(state => state.snake);
	const [isConsumed, setIsConsumed] = useState(false);
	const [gameEnded, setGameEnded] = useState(false);
	const [pos, setPos] = useState(
		generateRandomPosition(width - 20, height - 20)
	);
	const [context, setContext] = useState(null);

	const moveSnake = useCallback(
		(dx = 0, dy = 0, ds) => {
			if (dx > 0 && dy === 0 && ds !== 'RIGHT') {
				dispatch(makeMove(dx, dy, MOVE_RIGHT));
			}

			if (dx < 0 && dy === 0 && ds !== 'LEFT') {
				dispatch(makeMove(dx, dy, MOVE_LEFT));
			}

			if (dx === 0 && dy < 0 && ds !== 'UP') {
				dispatch(makeMove(dx, dy, MOVE_UP));
			}

			if (dx === 0 && dy > 0 && ds !== 'DOWN') {
				dispatch(makeMove(dx, dy, MOVE_DOWN));
			}
		},
		[dispatch]
	);

	const handleKeyEvents = useCallback(
		event => {
			if (disallowedDirection) {
				switch (event.key) {
					case 'w':
						moveSnake(0, -20, disallowedDirection);
						break;
					case 's':
						moveSnake(0, 20, disallowedDirection);
						break;
					case 'a':
						moveSnake(-20, 0, disallowedDirection);
						break;
					case 'd':
						event.preventDefault();
						moveSnake(20, 0, disallowedDirection);
						break;
				}
			} else {
				if (
					disallowedDirection !== 'LEFT' &&
					disallowedDirection !== 'UP' &&
					disallowedDirection !== 'DOWN' &&
					event.key === 'd'
				)
					moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
			}
		},
		[disallowedDirection, moveSnake]
	);

	useEffect(() => {
		if (isConsumed) {
			const posi = generateRandomPosition(width - 20, height - 20);
			setPos(posi);
			setIsConsumed(false);

			//Increase snake size when object is consumed successfully
			dispatch(increaseSnake());

			dispatch(scoreUpdates(INCREMENT_SCORE));
			console.log(snake1);
		}
	}, [isConsumed, pos, height, width, dispatch]);

	const resetBoard = useCallback(() => {
		window.removeEventListener('keypress', handleKeyEvents);
		dispatch(resetGame());
		dispatch(scoreUpdates(RESET_SCORE));
		clearBoard(context);
		drawObject(context, snake1, '#91C483');
		drawObject(
			context,
			[generateRandomPosition(width - 20, height - 20)],
			'#676FA3'
		); //Draws object randomly
		window.addEventListener('keypress', handleKeyEvents);
	}, [context, dispatch, handleKeyEvents, height, snake1, width]);

	useEffect(() => {
		setContext(canvasRef.current && canvasRef.current.getContext('2d'));
		clearBoard(context);
		drawObject(context, snake1, '#91C483'); //Draws snake at the required position
		drawObject(context, [pos], '#676FA3'); //Draws fruit randomly
		if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
			setIsConsumed(true);
			console.log(isConsumed);
		}
		if (
			hasSnakeCollided(snake1, snake1[0]) ||
			snake1[0].x >= width ||
			snake1[0].x <= 0 ||
			snake1[0].y <= 0 ||
			snake1[0].y >= height
		) {
			setGameEnded(true);
			dispatch(stopGame());
			window.removeEventListener('keypress', handleKeyEvents);
		} else setGameEnded(false);
	}, [context, pos, snake1, height, width, dispatch, handleKeyEvents]);
	useEffect(() => {
		window.addEventListener('keypress', handleKeyEvents);

		return () => {
			window.removeEventListener('keypress', handleKeyEvents);
		};
	}, [disallowedDirection, handleKeyEvents]);

	return (
		<>
			<canvas
				ref={canvasRef}
				style={{
					border: `3px solid ${gameEnded ? 'red' : 'black'}`
				}}
				height={height}
				width={width}
			/>
			<Instruction resetBoard={resetBoard} />
		</>
	);
}
