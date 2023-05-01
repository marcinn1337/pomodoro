import { useState, useEffect } from 'react'

export default function QuickNotes() {
	const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('pomodoroQuickNotes')) || '')

	useEffect(() => {
		localStorage.setItem('pomodoroQuickNotes', JSON.stringify(notes))
	}, [notes])
    
	const updateQuickNotes = e => {
		setNotes(e.target.value)
	}
	return (
		<section className='timer__notes'>
			<div className='timer__notes-header section-header'>
				<i className='fa-solid fa-file-pen'></i>
				<h4 className='timer__notes-header-title'>Quick Notes</h4>
			</div>
			<textarea onChange={updateQuickNotes} className='timer__notes-textarea' value={notes}></textarea>
		</section>
	)
}
