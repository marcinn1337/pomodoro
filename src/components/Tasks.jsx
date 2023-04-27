import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

function Tasks() {
	const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('pomodoroTaskList')) || [])
	const [taskInput, setTaskInput] = useState('')
	const updateInput = e => setTaskInput(e.target.value)

	// Save taskList to local storage when taskList is updated
	useEffect(() => {
		localStorage.setItem('pomodoroTaskList', JSON.stringify(taskList))
	}, [taskList])

	const addNewTask = () => {
		setTaskList(prevTaskList =>
			prevTaskList.unshift({
				id: nanoid(),
				description: taskInput,
			})
		)
	}
	const JSXtaskItems = taskList.map(taskItem => (
		<Task key={taskItem.id} id={taskItem.id} description={taskItem.description} />
	))
	return (
		<section className='timer__tasks'>
			<div className='timer__tasks-header section-header'>
				<i className='fa-solid fa-file-lines'></i>
				<h4 className='timer__tasks-header-title'>Tasks</h4>
			</div>
			<form className='timer__tasks-form'>
				<input
					value={taskInput}
					onChange={updateInput}
					type='text'
					placeholder='Type task description...'
					className='timer__tasks-form-input'
				/>
				<button onClick={addNewTask} className='timer__tasks-form-btn'>
					Add
				</button>
			</form>
			<ul className='timer__tasks-list'>{JSXtaskItems}</ul>
		</section>
	)
}

export default Tasks
