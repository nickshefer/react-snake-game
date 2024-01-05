export const Instruction = ({ resetBoard }) => (
	<div>
		<h6 className='h6'>How to Play</h6>
		<h5>
			NOTE: Start the game by pressing <kbd>d</kbd>
		</h5>
		<div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>
					<kbd>w</kbd> Move Up
				</span>
				<span>
					<kbd>a</kbd> Move Left
				</span>
				<span>
					<kbd>s</kbd> Move Down
				</span>
				<span>
					<kbd>d</kbd> Move Right
				</span>
			</div>
			<div>
				<button onClick={() => resetBoard()}>Reset game</button>
			</div>
		</div>
	</div>
);
