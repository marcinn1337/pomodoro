import { useState } from 'react'
import Settings from './components/Settings'
import Clock from './components/Clock'
import Background from './components/Background'
import Tasks from './components/Tasks'
import QuickNotes from './components/QuickNotes'

function Timer() {
	const [activeSettings, setActiveSettings] = useState(false)
	const [currentPhase, setCurrentPhase] = useState('focus')
	const toggleSettings = () => {
		setActiveSettings(prevActiveSettings => !prevActiveSettings)
	}
	const fetchCurrentPhase = phase => {
		setCurrentPhase(phase)
	}

	return (
		<>
			<Background currentPhase={currentPhase} />
			<div className='timer'>
				<button onClick={toggleSettings} className='timer__open-settings-btn'>
					<i className='fa-solid fa-gear'></i>
				</button>
				<Clock fetchCurrentPhase={fetchCurrentPhase} />
				<Tasks />
				<QuickNotes />
				{activeSettings && <Settings toggleSettings={toggleSettings} />}
			</div>
		</>
	)
}

export default Timer
