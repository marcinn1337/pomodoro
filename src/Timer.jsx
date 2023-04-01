import Clock from './components/Clock'
import Settings from './components/Settings'
import { useState } from 'react'

function Timer() {
	return (
		<div className='timer'>
			<button className='timer__open-settings-btn'>
				<i className='fa-solid fa-gear'></i>
			</button>
			<Clock />
			<section className='timer__tasks'>
				<div className='timer__tasks-header section-header'>
					<i className='fa-solid fa-file-lines'></i>
					<h4 className='timer__tasks-header-title'>Tasks</h4>
				</div>
				<form className='timer__tasks-form'>
					<input type='text' placeholder='Type task name...' className='timer__tasks-form-input' />
					<button className='timer__tasks-form-btn'>Add</button>
				</form>
				<ul className='timer__tasks-list'>
					<li className='timer__tasks-list-item'>
						<input className='timer__tasks-list-item-checkbox' type='checkbox' />
						<label className='timer__tasks-list-item-name'>Task 1</label>
						<button className='timer__tasks-list-item-delete'>
							<i className='fa solid fa-trash'></i>
						</button>
					</li>
					<li className='timer__tasks-list-item done'>
						<input className='timer__tasks-list-item-checkbox' type='checkbox' />
						<label className='timer__tasks-list-item-name'>Task 2</label>
						<button className='timer__tasks-list-item-delete'>
							<i className='fa solid fa-trash'></i>
						</button>
					</li>
					<li className='timer__tasks-list-item'>
						<input className='timer__tasks-list-item-checkbox' type='checkbox' />{' '}
						<label className='timer__tasks-list-item-name'>Task 3</label>
						<button className='timer__tasks-list-item-delete'>
							<i className='fa solid fa-trash'></i>
						</button>
					</li>
				</ul>
			</section>
			<section className='timer__notes'>
				<div className='timer__notes-header section-header'>
					<i className='fa-solid fa-file-pen'></i>
					<h4 className='timer__notes-header-title'>Notes</h4>
				</div>
				<textarea className='timer__notes-textarea' name='' id=''></textarea>
			</section>
			<Settings />
		</div>
	)
}

export default Timer
