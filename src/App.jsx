import { Provider } from 'react-redux';
import CanvasBoard from './components/CanvasBoard';
import { store } from './store';
import ScoreCard from './components/ScoreCard';
import { Instruction } from './components/Instraction';

function App() {
	return (
		<Provider store={store}>
			<h1 style={{ textAlign: 'center' }}>SNAKE GAME</h1>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<ScoreCard />
			</div>
			<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
				<CanvasBoard width={1000} height={600} />
			</div>
		</Provider>
	);
}

export default App;
