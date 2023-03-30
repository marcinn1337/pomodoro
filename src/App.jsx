import { useState } from 'react'

function App() {
	return (
		<div className='app'>
			<div className='timer__btns'>
				<button className='timer__btn'>
					<i className='fa-solid fa-arrow-rotate-left'></i>
				</button>
				<button className='timer__btn'>
					<i className='fa-solid fa-play'></i>
				</button>
				<button className='timer__btn'>
					<i className='fa-solid fa-gear'></i>
				</button>
			</div>
			<div className='timer__clock'>
				<span className='timer__clock-minutes'>21</span> : <span className='timer__clock-seconds'>37</span>
			</div>
			<section className='timer__tasks'></section>
			<section className='timer__notes'></section>
			<section className='timer__settings'></section>
		</div>
	)
}

export default App
