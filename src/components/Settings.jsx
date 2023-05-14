import { useState, useEffect, useRef } from 'react'
import Alert from './Alert'

// Init settings to avoid crash
const initDefaultSettings = () => {
	localStorage.setItem(
		'pomodoroSettings',
		JSON.stringify({
			focusTime: 25,
			shortBreakTime: 5,
			longBreakTime: 15,
			autoStart: false,
			focusBgHue: 340,
			shortBreakBgHue: 162,
			longBreakBgHue: 210,
			alarmSoundOn: false,
			backgroundSoundOn: false,
			chosenSound: 'rain1',
			backgroundVolume: 0.5,
		})
	)
}
if (!localStorage.getItem('pomodoroSettings')) initDefaultSettings()

export default function Settings(props) {
	const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('pomodoroSettings')))
	const [isAlertOn, setIsAlertOn] = useState(false)
	const alertMessage = useRef()

	useEffect(() => {
		localStorage.setItem('pomodoroSettings', JSON.stringify(settings))
	}, [settings])

	const checkForError = () => {
		if (settings.focusTime === '' || settings.shortBreakTime === '' || settings.longBreakTime === '') {
			// Check if any number input has empty or different than numeric value
			return 1
		} else if (
			settings.focusTime < 1 ||
			settings.shortBreakTime < 1 ||
			settings.longBreakTime < 1 ||
			settings.focusTime > 60 ||
			settings.shortBreakTime > 60 ||
			settings.longBreakTime > 60
		) {
			// Check if any number input has value between 1-60
			return 2
		}
		return false
	}
	const closeSettings = () => {
		const settingsHasError = checkForError()

		// If there is no errors, close settings
		if (!settingsHasError) {
			props.toggleSettings()
			return
		}

		// Set alert message and display alert
		switch (settingsHasError) {
			case 1:
				alertMessage.current = 1
				break
			case 2:
				alertMessage.current = 2
				break
		}
		setIsAlertOn(true)
		setTimeout(() => {
			setIsAlertOn(false)
		}, 4000)
	}
	const updateSettings = e => {
		const { name, value, type, checked } = e.target

		setSettings(prevSettings => {
			return {
				...prevSettings,
				[name]: type === 'checkbox' ? checked : value,
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
			<div className='settings-background'></div>
			<section className='settings'>
				<div className='settings__header'>
					<h2 className='settings__header-title'>Settings</h2>
					<button onClick={closeSettings} className='settings__header-close'>
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
						<option value='rain2'>Rain 2</option>
						<option value='waves'>Waves</option>
						<option value='ticking'>Clock ticking</option>
					</select>
					<label>Sound Volume</label>
					<input
						onChange={updateSettings}
						value={settings.backgroundVolume}
						name='backgroundVolume'
						type='range'
						min='0'
						max='1'
						step='0.01'
						className='volume-range'
					/>
				</div>
				{isAlertOn && <Alert message={alertMessage.current} />}
			</section>
		</>
	)
}
