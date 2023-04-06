export default function Background() {
	const focusBg = JSON.parse(localStorage.getItem('pomodoroSettings')).focusBg
	const shortBreakBg = JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakBg
	const longBreakBg = JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakBg

	const styles = {
		background: `${focusBg}`,
	}
	return <div style={styles} className='root-background'></div>
}
