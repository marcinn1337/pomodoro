import { useState } from 'react'
import Settings from './components/Settings'
import Clock from './components/Clock'
import Background from './components/Background'
import Tasks from './components/Tasks'

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
		<div className='timer'>
			<Background currentPhase={currentPhase} />
			<button onClick={toggleSettings} className='timer__open-settings-btn'>
				<i className='fa-solid fa-gear'></i>
			</button>
			<Clock fetchCurrentPhase={fetchCurrentPhase} />
			<Tasks />
			<section className='timer__notes'>
				<div className='timer__notes-header section-header'>
					<i className='fa-solid fa-file-pen'></i>
					<h4 className='timer__notes-header-title'>Notes</h4>
				</div>
				<textarea className='timer__notes-textarea' name='' id=''></textarea>
			</section>
			{activeSettings && <Settings toggleSettings={toggleSettings} />}
		</div>
	)
}

export default Timer
