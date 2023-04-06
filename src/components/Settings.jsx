import { useState, useEffect } from 'react'
export default function Settings(props) {
	const [settings, setSettings] = useState(
		JSON.parse(localStorage.getItem('pomodoroSettings')) || {
			focusTime: 20,
			shortBreakTime: 5,
			longBreakTime: 15,
			autoStart: false,
			focusBg: `linear-gradient(135deg, hsl(162,66%, 19%) 0%, hsl(162,75%,8%) 100%)`,
			shortBreakBg: `linear-gradient(135deg, hsl(50,66%, 19%) 0%, hsl(50,75%,8%) 100%)`,
			longBreakBg: `linear-gradient(135deg, hsl(210,66%, 19%) 0%, hsl(210,75%,8%) 100%)`,
		}
	)
	useEffect(() => {
		localStorage.setItem('pomodoroSettings', JSON.stringify(settings))
	}, [settings])

	const updateSettings = e => {
		const { name, value, type, checked } = e.target
		setSettings(prevSettings => {
			return {
				...prevSettings,
				[name]: type === 'checkbox' ? checked : value,
			}
		})
	}
	const updateBgColor = e => {
		const { name, value } = e.target
		setSettings(prevSettings => {
			return {
				...prevSettings,
				[name]: `linear-gradient(135deg, hsl(${value},66%, 19%) 0%, hsl(${value},75%,8%) 100%)`,
			}
		})
	}
	return (
		<>
			<div className='background'></div>
			<section className='settings'>
				<div className='settings__header'>
					<h2 className='settings__header-title'>Settings</h2>
					<button onClick={props.toggleSettings} className='settings__header-close'>
						<i className='fa-solid fa-xmark'></i>
					</button>
				</div>
				<div className='settings__section timer-section'>
					<h3 className='settings__section-title'>Timer</h3>
					<label>Focus</label>
					<input onChange={updateSettings} name='focusTime' value={settings.focusTime} type='number' placeholder='20' />
					<label>Short break</label>
					<input
						onChange={updateSettings}
						name='shortBreakTime'
						value={settings.shortBreakTime}
						type='number'
						placeholder='5'
					/>
					<label>Long break</label>
					<input
						onChange={updateSettings}
						name='longBreakTime'
						value={settings.longBreakTime}
						type='number'
						placeholder='15'
					/>
					<label>Auto Start</label>
					<input
						onChange={updateSettings}
						name='autoStart'
						value={settings.autoStart}
						className='switch'
						type='checkbox'
					/>
				</div>

				<div className='settings__section'>
					<h3 className='settings__section-title'>Theme</h3>
					<label>Focus</label>
					<input style={{ background: settings.focusBg }} className='color-preview' type='checkbox' />
					<input
						onChange={updateBgColor}
						name='focusBg'
						className='color-range hidden-input'
						type='range'
						min='0'
						max='360'
					/>
					<label>Short break</label>
					<input style={{ background: settings.shortBreakBg }} className='color-preview' type='checkbox' />
					<input
						onChange={updateBgColor}
						name='shortBreakBg'
						className='color-range hidden-input'
						type='range'
						min='0'
						max='360'
					/>
					<label>Long break</label>
					<input style={{ background: settings.longBreakBg }} className='color-preview' type='checkbox' />
					<input
						onChange={updateBgColor}
						name='longBreakBg'
						className='color-range hidden-input'
						type='range'
						min='0'
						max='360'
					/>
				</div>

				<div className='settings__section'>
					<h3 className='settings__section-title'>Audio</h3>
					<label>Alarm Sound</label>
					<input className='switch' type='checkbox' />
					<select className='hidden-input' name='' id=''>
						<option value=''>Sound 1</option>
						<option value=''>Sound 2</option>
						<option value=''>Sound 3</option>
						<option value=''>Sound 4</option>
					</select>
					<label>Background sound</label>
					<input className='switch' type='checkbox' />
					<select className='hidden-input' name='' id=''>
						<option value=''>Sound 1</option>
						<option value=''>Sound 2</option>
						<option value=''>Sound 3</option>
						<option value=''>Sound 4</option>
					</select>
				</div>
			</section>
		</>
	)
}
