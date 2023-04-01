export default function Settings() {
	return (
		<>
			<div className='background'></div>
			<section className='settings'>
				<div className='settings__header'>
					<h2 className='settings__header-title'>Settings</h2>
					<button className='settings__header-close'>
						<i className='fa-solid fa-xmark'></i>
					</button>
				</div>
				<div className='settings__section'>
					<h3 className='settings__section-title'>Timer</h3>
					<label>Focus</label>
					<input type='number' placeholder='20' />
					<label>Short break</label>
					<input type='number' placeholder='5' />
					<label>Long break</label>
					<input type='number' placeholder='15' />
					<label>Auto Start</label>
					<input className='switch' type='checkbox' />
				</div>
				<div className='settings__section'>
					<h3 className='settings__section-title'>Theme</h3>
					<label>Focus</label>
					<input className='color-preview' type='checkbox' />
					<input className='color-range' type='range' />
					<label>Short break</label>
					<input className='color-preview' type='checkbox' />
					<input className='color-range' type='range' />
					<label>Long break</label>
					<input className='color-preview' type='checkbox' />
					<input className='color-range' type='range' />
				</div>
			</section>
		</>
	)
}
