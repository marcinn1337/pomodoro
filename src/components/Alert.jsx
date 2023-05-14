import { useRef } from 'react'

export default function Alert(props) {
	const alertMessages = [
		'',
		'Timer input can not be left empty or have non numeric values',
		'Timer input must contain value between 1 and 60',
		'Task name must contain between 3 and 60 characters',
		'Timer changes may need page refresh to be applied',
	]

	return (
		<div className='alert'>
			<i className='fa-solid fa-triangle-exclamation'></i>
			<p>{alertMessages[props.message]}</p>
		</div>
	)
}
