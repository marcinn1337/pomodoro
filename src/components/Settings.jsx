import { useState, useEffect } from 'react'

// Init settings to avoid crash
const initDefaultSettings = () => {
	localStorage.setItem(
		'pomodoroSettings',
		JSON.stringify({
			focusTime: 10,
			shortBreakTime: 15,
			longBreakTime: 20,
			autoStart: false,
			focusBgHue: 162,
			shortBreakBgHue: 50,
			longBreakBgHue: 210,
			alarmSoundOn: false,
			backgroundSoundOn: false,
			chosenSound: '',
			soundVolume: 50,
		})
	)
}
if (!localStorage.getItem('pomodoroSettings')) initDefaultSettings()

export default function Settings(props) {
	const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('pomodoroSettings')))
	useEffect(() => {
		localStorage.setItem('pomodoroSettings', JSON.stringify(settings))
	}, [settings])

	const updateSettings = e => {
		const { name, value, type, checked } = e.target
		console.log(name, type, value)
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
	const previewColors = {
		focusBg: `linear-gradient(135deg, hsl(${settings.focusBgHue},66%, 19%) 0%, hsl(${settings.focusBgHue},75%,8%) 100%)`,
		shortBreakBg: `linear-gradient(135deg, hsl(${settings.shortBreakBgHue},66%, 19%) 0%, hsl(${settings.shortBreakBgHue},75%,8%) 100%)`,
		longBreakBg: `linear-gradient(135deg, hsl(${settings.longBreakBgHue},66%, 19%) 0%, hsl(${settings.longBreakBgHue},75%,8%) 100%)`,
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
						checked={settings.autoStart}
						className='switch'
						type='checkbox'
					/>
				</div>

				<div className='settings__section'>
					<h3 className='settings__section-title'>Theme</h3>
					<label>Focus</label>
					<input style={{ background: previewColors.focusBg }} className='color-preview' type='checkbox' />
					<input
						onChange={updateSettings}
						name='focusBgHue'
						className='color-range hidden-input'
						type='range'
						value={settings.focusBgHue}
						min='0'
						max='360'
					/>
					<label>Short break</label>
					<input style={{ background: previewColors.shortBreakBg }} className='color-preview' type='checkbox' />
					<input
						onChange={updateSettings}
						name='shortBreakBgHue'
						className='color-range hidden-input'
						type='range'
						value={settings.shortBreakBgHue}
						min='0'
						max='360'
					/>
					<label>Long break</label>
					<input style={{ background: previewColors.longBreakBg }} className='color-preview' type='checkbox' />
					<input
						onChange={updateSettings}
						name='longBreakBgHue'
						className='color-range hidden-input'
						type='range'
						value={settings.longBreakBgHue}
						min='0'
						max='360'
					/>
				</div>

				<div className='settings__section'>
					<h3 className='settings__section-title'>Audio</h3>
					<label>Alarm Sound</label>
					<input
						checked={settings.alarmSoundOn}
						name='alarmSoundOn'
						onChange={updateSettings}
						className='switch'
						type='checkbox'
					/>
					<label>Background sound</label>
					<input
						onChange={updateSettings}
						name='backgroundSoundOn'
						checked={settings.backgroundSoundOn}
						className='switch'
						type='checkbox'
					/>
					<select onChange={updateSettings} name='chosenSound' value={settings.chosenSound} className='hidden-input'>
						<option value='rain1'>Rain 1</option>
						<option value=''>Sound 2</option>
						<option value=''>Sound 3</option>
						<option value=''>Sound 4</option>
					</select>
					<label>Sound Volume</label>
					<input
						onChange={updateSettings}
						value={settings.soundVolume}
						name='soundVolume'
						type='range'
						min='0'
						max='100'
						className='volume-range'
					/>
				</div>
			</section>
		</>
	)
}
