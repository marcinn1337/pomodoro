export default function Task() {
	return (
		<li className='timer__tasks-list-item'>
			<input className='timer__tasks-list-item-checkbox' type='checkbox' />
			<label className='timer__tasks-list-item-name'>Task 1</label>
			<button className='timer__tasks-list-item-delete'>
				<i className='fa solid fa-trash'></i>
			</button>
		</li>
	)
}
