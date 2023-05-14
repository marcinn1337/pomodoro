import { useState, useEffect, useRef } from 'react'
import alarmSfx from '../sfx/alarmSfx.mp3'
import clickSfx from '../sfx/clickSfx.mp3'

export default function Clock(props) {
	// Get settings values from local storage
	// const [timeValues, changeTimeValues] = useState({
	// 	focusTime: JSON.parse(localStorage.getItem('pomodoroSettings')).focusTime,
	// 	shortBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakTime,
	// 	longBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakTime,
	// })
	const timeValues = {
		focusTime: JSON.parse(localStorage.getItem('pomodoroSettings')).focusTime,
		shortBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakTime,
		longBreakTime: JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakTime,
	}

	const autoStart = JSON.parse(localStorage.getItem('pomodoroSettings')).autoStart
	const backgroundSoundOn = JSON.parse(localStorage.getItem('pomodoroSettings')).backgroundSoundOn
	const alarmSoundOn = JSON.parse(localStorage.getItem('pomodoroSettings')).alarmSoundOn
	const backgroundSfx = JSON.parse(localStorage.getItem('pomodoroSettings')).chosenSound

	// States and refs
	const currentPhase = useRef('focus')
	const setTimeValues = currentPhase => {
		// Set countdown timer after phase has changed
		switch (currentPhase) {
			case 'shortBreak':
				return timeValues.shortBreakTime
			case 'longBreak':
				return timeValues.longBreakTime
			default:
				return timeValues.focusTime
		}
	}
	const [secondsLeft, setSecondsLeft] = useState(setTimeValues(currentPhase.current))
	const [isRunning, setIsRunning] = useState(false)
	const pomodorosCount = useRef(0)
	const clockInterval = useRef()

	// Sounds Refs
	const clickSfxRef = useRef()
	const alarmSfxRef = useRef()
	const backgroundSfxRef = useRef()
	if (backgroundSfxRef.current !== undefined) {
		backgroundSfxRef.current.volume = parseFloat(JSON.parse(localStorage.getItem('pomodoroSettings')).backgroundVolume)
	}

	// Stop clock on component dismount
	useEffect(() => {
		return () => stopClock()
	}, [])

	// Toggle clock when isRunning is changed (after clicking the btn)
	useEffect(() => {
		isRunning ? startClock() : stopClock()
	}, [isRunning])

	// Check if countdown is over and change the phase of app, reset clock and toggle sound effects.  Automatically start next phase if user has set it in settings.
	useEffect(() => {
		if (secondsLeft > 0) return

		let prevPhase = currentPhase.current
		alarmSoundOn ? alarmSfxRef.current.play() : null

		currentPhase.current = setNextPhase()
		sendCurrentPhaseInfo(currentPhase.current)

		if (autoStart && backgroundSoundOn) {
			prevPhase === 'focus' ? backgroundSfxRef.current.pause() : backgroundSfxRef.current.play()
			setSecondsLeft(setTimeValues(currentPhase.current))
			return
		}

		if (backgroundSoundOn) backgroundSfxRef.current.pause()
		resetClock()
	}, [secondsLeft])

	// Clock functions
	const startClock = () => {
		if ((currentPhase.current === 'focus') & backgroundSoundOn) {
			backgroundSfxRef.current.play()
		}

		clockInterval.current = setInterval(() => {
			setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1)
		}, 500)
	}
	const stopClock = () => {
		if (backgroundSoundOn) backgroundSfxRef.current.pause()
		clearInterval(clockInterval.current)
		clockInterval.current = null
	}
	const resetClock = () => {
		stopClock()
		setIsRunning(false)
		setSecondsLeft(setTimeValues(currentPhase.current))
	}
	const togglePomodoro = () => {
		clickSfxRef.current.play()
		setIsRunning(prevState => !prevState)
	}

	const setNextPhase = () => {
		switch (currentPhase.current) {
			case 'shortBreak':
				return 'focus'
			case 'longBreak':
				pomodorosCount.current = 0
				return 'focus'
			default:
				pomodorosCount.current += 1
				if (pomodorosCount.current === 3) return 'longBreak'
				return 'shortBreak'
		}
	}
	const sendCurrentPhaseInfo = phase => {
		props.fetchCurrentPhase(phase)
	}
	// Displaying 0 before number when it's less than 10. Is improves the appearance of the clock
	const formattedMinutes =
		Math.floor(secondsLeft / 60) < 10 ? `0${Math.floor(secondsLeft / 60)}` : `${Math.floor(secondsLeft / 60)}`
	const formattedSeconds = secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : `${secondsLeft % 60}`

	return (
		<>
			<audio src={clickSfx} ref={clickSfxRef} />
			<audio src={alarmSfx} ref={alarmSfxRef} />
			<audio loop src={`/src/sfx/${backgroundSfx}.mp3`} ref={backgroundSfxRef} />
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
