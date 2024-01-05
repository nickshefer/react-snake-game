import React from 'react';
import { useSelector } from 'react-redux';

export default function Current() {
	const score = useSelector(state => state.score);
	return <div className='score'>Current score: {score}</div>;
}
