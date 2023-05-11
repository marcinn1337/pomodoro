import { useRef } from 'react'

export default function Alert() {
	

	return (
		<div className='alert'>
			<i className='fa-solid fa-triangle-exclamation'></i>
			<p>Task name must contain between 3 and 60 characters</p>
		</div>
	)
}
