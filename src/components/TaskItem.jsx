export default function Task(props) {
	const deleteTask = () => {
		props.deleteTask(props.id)
	}
	const toggleStatus = () => {
		props.toggleStatus(props.id)
	}
	return (
		<li className={props.isDone ? `timer__tasks-list-item done` : `timer__tasks-list-item`}>
			<input
				id={props.id}
				onChange={toggleStatus}
				className='timer__tasks-list-item-checkbox'
				type='checkbox'
				checked={props.isDone}
			/>
			<label htmlFor={props.id} className='timer__tasks-list-item-name'>
				{props.description}
			</label>
			<button onClick={deleteTask} className='timer__tasks-list-item-delete'>
				<i className='fa solid fa-trash'></i>
			</button>
		</li>
	)
}
