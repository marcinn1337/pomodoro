import { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import Task from './TaskItem'
// Fixed addNewTask function
// Created deleteTask and toggleStatus function

function Tasks() {
	const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('pomodoroTaskList')) || [])
	const [taskInput, setTaskInput] = useState('')
	const updateInput = e => setTaskInput(e.target.value)

	// Save taskList to local storage when taskList is updated
	useEffect(() => {
		localStorage.setItem('pomodoroTaskList', JSON.stringify(taskList))
	}, [taskList])

	// Add new task to the beginning of task list
	const addNewTask = () => {
		setTaskList(prevTaskList => [
			{
				id: nanoid(),
				description: taskInput,
				isDone: false,
			},
			...prevTaskList,
		])
	}
	const deleteTask = id => {
		setTaskList(prevTaskList => {
			return prevTaskList.filter(task => task.id !== id)
		})
	}
	// Mark task as done / not done and move to to the end of the list
	const toggleTaskStatus = id => {
		setTaskList(prevTaskList => {
			let finishedTask = prevTaskList.filter(task => task.id === id)[0]
			return [...prevTaskList.filter(task => task.id !== id), { ...finishedTask, isDone: !finishedTask.isDone }]
		})
	}
	const JSXtaskItems = taskList.map(taskItem => {
		return (
			<Task
				key={taskItem.id}
				id={taskItem.id}
				description={taskItem.description}
				isDone={taskItem.isDone}
				deleteTask={deleteTask}
				toggleStatus={toggleTaskStatus}
			/>
		)
	})
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
				<button type='button' onClick={addNewTask} className='timer__tasks-form-btn'>
					Add
				</button>
			</form>
			<ul className='timer__tasks-list'>{JSXtaskItems}</ul>
		</section>
	)
}

export default Tasks
