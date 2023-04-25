export default function Background() {
	const colorHues = {
		focus: JSON.parse(localStorage.getItem('pomodoroSettings')).focusBgHue,
		shortBreak: JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakBgHue,
		longBreak: JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakBgHue,
	}
	const bgColors = {
		focusBg: `linear-gradient(135deg, hsl(${colorHues.focus},66%, 19%) 0%, hsl(${colorHues.focus},75%,8%) 100%)`,
		shortBreakBg: `linear-gradient(135deg, hsl(${colorHues.shortBreak},66%, 19%) 0%, hsl(${colorHues.shortBreak},75%,8%) 100%)`,
		longBreakBg: `linear-gradient(135deg, hsl(${colorHues.longBreak},66%, 19%) 0%, hsl(${colorHues.longBreak},75%,8%) 100%)`,
	}

	const styles = {
		background: `${bgColors.focusBg}`,
	}
	return <div style={styles} className='root-background'></div>
}
