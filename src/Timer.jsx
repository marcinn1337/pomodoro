import { useState } from 'react'
import Settings from './components/Settings'
import Clock from './components/Clock'
import Tasks from './components/Tasks'
import QuickNotes from './components/QuickNotes'
import Alert from './components/Alert'

function Timer() {
	const [isAlertOn, setIsAlertOn] = useState(false)
	const [activeSettings, setActiveSettings] = useState(false)
	const [currentPhase, setCurrentPhase] = useState('focus')
	const toggleSettings = () => {
		setActiveSettings(prevActiveSettings => !prevActiveSettings)
	}
	const fetchCurrentPhase = phase => {
		setCurrentPhase(phase)
	}

	// Background setup
	const colorHues = {
		focus: JSON.parse(localStorage.getItem('pomodoroSettings')).focusBgHue,
		shortBreak: JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakBgHue,
		longBreak: JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakBgHue,
	}
	const getCurrentBg = () => {
		switch (currentPhase) {
			case 'focus':
				return `linear-gradient(135deg, hsl(${colorHues.focus},66%, 19%) 0%, hsl(${colorHues.focus},75%,8%) 100%)`
			case 'shortBreak':
				return `linear-gradient(135deg, hsl(${colorHues.shortBreak},66%, 19%) 0%, hsl(${colorHues.shortBreak},75%,8%) 100%)`
			case 'longBreak':
				return `linear-gradient(135deg, hsl(${colorHues.longBreak},66%, 19%) 0%, hsl(${colorHues.longBreak},75%,8%) 100%)`
			default:
				break
		}
	}
	const styles = {
		background: getCurrentBg(),
	}
	console.log(JSON.parse(localStorage.getItem('pomodoroSettings')).focusTime)
	console.log(activeSettings)
	return (
		<div className='timer' style={styles}>
			<button onClick={toggleSettings} className='timer__open-settings-btn'>
				<i className='fa-solid fa-gear'></i>
			</button>
			<Clock fetchCurrentPhase={fetchCurrentPhase} />
			<Tasks />
			<QuickNotes />
			{activeSettings && <Settings toggleSettings={toggleSettings} />}
			{isAlertOn && <Alert message={4}/>}
		</div>
	)
}

export default Timer
