import { useState, useEffect, useRef } from 'react'

export default function Clock() {
	const [secondsLeft, setSecondsLeft] = useState(70)
	const [isRunning, setIsRunning] = useState(false)
	const clockInterval = useRef()

	// Clearing clock on component dismount
	useEffect(() => {
		return () => stopClock()
	}, [])

	// Toggle clock when isRunning is changed
	useEffect(() => {
		isRunning ? startClock() : stopClock()
	}, [isRunning])

	const startClock = () => {
		clockInterval.current = setInterval(() => {
			setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1)
		}, 1000)
	}
	const stopClock = () => {
		clearInterval(clockInterval.current)
		clockInterval.current = null
	}

	// Fn that is toggling isRunning state
	const togglePomodoro = () => {
		setIsRunning(prevState => !prevState)
	}

	return (
		<>
			<div className='timer__btns'>
				<button className='timer__btn'>
					<i className='fa-solid fa-arrow-rotate-left'></i>
				</button>
				<button className='timer__btn' onClick={togglePomodoro}>
					<i className='fa-solid fa-play'></i>
				</button>
				<button className='timer__btn'>
					<i className='fa-solid fa-gear'></i>
				</button>
			</div>
			<div className='timer__clock'>
				<span className='timer__clock-minutes'>{Math.floor(secondsLeft / 60)}</span>:
				<span className='timer__clock-seconds'>{secondsLeft % 60}</span>
			</div>
		</>
	)
}
