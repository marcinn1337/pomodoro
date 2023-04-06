import { useState, useEffect, useRef } from 'react'

export default function Clock() {
	// Get time values from settings
	const timeValues = {
		focusTime: JSON.parse(localStorage.getItem('pomodoroSettings')).focusTime * 60,
		shortBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakTime,
		longBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakTime,
	}

	const [secondsLeft, setSecondsLeft] = useState(timeValues.focusTime)
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
	const resetClock = () => {
		stopClock()
		setSecondsLeft(70)
		setIsRunning(false)
	}
	// Fn that is toggling isRunning state
	const togglePomodoro = () => {
		setIsRunning(prevState => !prevState)
	}

	// Displaying 0 before number when it's less than 10. Makes clock more aesthetic
	const formattedMinutes =
		Math.floor(secondsLeft / 60) < 10 ? `0${Math.floor(secondsLeft / 60)}` : `${Math.floor(secondsLeft / 60)}`
	const formattedSeconds = secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : `${secondsLeft % 60}`

	return (
		<>
			<div className='timer__btns'>
				<button onClick={resetClock} className='timer__btn'>
					<i className='fa-solid fa-arrow-rotate-left'></i>
				</button>
				<button className='timer__btn' onClick={togglePomodoro}>
					<i className={!isRunning ? 'fa-solid fa-play' : 'fa-solid fa-pause'}></i>
				</button>
			</div>
			<div className='timer__clock'>
				<span className='timer__clock-minutes'>{formattedMinutes}</span>:
				<span className='timer__clock-seconds'>{formattedSeconds}</span>
			</div>
		</>
	)
}
