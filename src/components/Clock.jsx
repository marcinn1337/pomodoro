import { useState, useEffect, useRef } from 'react'
import startingSfx from '../sfx/startSfx.mp3'
import finishSfx from '../sfx/stopSfx.mp3'
import backgroundSfx from '../sfx/rainSfx.wav'

// Get time values from settings
const timeValues = {
	focusTime: JSON.parse(localStorage.getItem('pomodoroSettings')).focusTime * 5,
	shortBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakTime * 2,
	longBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakTime * 1,
}

// Set countdown timer after phase has changed
const setTimeValues = currentPhase => {
	switch (currentPhase) {
		case 'shortBreak':
			return timeValues.shortBreakTime
		case 'longBreak':
			return timeValues.longBreakTime
		default:
			return timeValues.focusTime
	}
}

export default function Clock() {
	const autoStart = JSON.parse(localStorage.getItem('pomodoroSettings')).autoStart
	const backgroundSound = JSON.parse(localStorage.getItem('pomodoroSettings')).backgroundSound
	const currentPhase = useRef('focus')
	const [secondsLeft, setSecondsLeft] = useState(setTimeValues(currentPhase.current))

	const [isRunning, setIsRunning] = useState(false)
	const clockInterval = useRef()
	const startingSfxRef = useRef()
	const finishSfxRef = useRef()
	const backgroundSfxRef = useRef()

	// Clearing clock on component dismount
	useEffect(() => {
		return () => stopClock()
	}, [])

	// Toggle clock when isRunning is changed (after clicking the btn)
	useEffect(() => {
		isRunning ? startClock() : stopClock()
	}, [isRunning])

	// Check if countdown is over and change the phase of app. Automatically starting next phase if user has set it in settings.
	useEffect(() => {
		if ((secondsLeft === 0) & !autoStart) {
			finishSfxRef.current.play()
			currentPhase.current = setNextPhase()
			resetClock()
		} else if ((secondsLeft === 0) & autoStart) {
			finishSfxRef.current.play()
			currentPhase.current = setNextPhase()
			setSecondsLeft(setTimeValues(currentPhase.current))
		}
	}, [secondsLeft])

	// Clock functions
	const startClock = () => {
		startingSfxRef.current.play()
		backgroundSfxRef.current.play()
		clockInterval.current = setInterval(() => {
			setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1)
		}, 200)
	}
	const stopClock = () => {
		clearInterval(clockInterval.current)
		clockInterval.current = null
	}
	const resetClock = () => {
		stopClock()
		setIsRunning(false)
		setSecondsLeft(setTimeValues(currentPhase.current))
	}
	const togglePomodoro = () => {
		setIsRunning(prevState => !prevState)
	}

	const setNextPhase = () => {
		switch (currentPhase.current) {
			case 'shortBreak':
				return 'longBreak'
			case 'longBreak':
				return 'focus'
			default:
				return 'shortBreak'
		}
	}

	// Displaying 0 before number when it's less than 10. Makes clock more aesthetic
	const formattedMinutes =
		Math.floor(secondsLeft / 60) < 10 ? `0${Math.floor(secondsLeft / 60)}` : `${Math.floor(secondsLeft / 60)}`
	const formattedSeconds = secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : `${secondsLeft % 60}`

	return (
		<>
			<audio src={startingSfx} ref={startingSfxRef} />
			<audio src={finishSfx} ref={finishSfxRef} />
			{backgroundSound && <audio loop src={backgroundSfx} ref={backgroundSfxRef} />}
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