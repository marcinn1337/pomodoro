export default function Background(props) {
	const colorHues = {
		focus: JSON.parse(localStorage.getItem('pomodoroSettings')).focusBgHue,
		shortBreak: JSON.parse(localStorage.getItem('pomodoroSettings')).shortBreakBgHue,
		longBreak: JSON.parse(localStorage.getItem('pomodoroSettings')).longBreakBgHue,
	}
	const getCurrentBg = () => {
		switch (props.currentPhase) {
			case 'focus':
				return `linear-gradient(135deg, hsl(${colorHues.focus},66%, 19%) 0%, hsl(${colorHues.focus},75%,8%) 100%)`
			case 'shortBreak':
				return `linear-gradient(135deg, hsl(${colorHues.shortBreak},66%, 19%) 0%, hsl(${colorHues.shortBreak},75%,8%) 100%)`
			case 'longBreak':
				return `linear-gradient(135deg, hsl(${colorHues.longBreak},66%, 19%) 0%, hsl(${colorHues.longBreak},75%,8%) 100%)`
			default:
				break
		}
	}

	const styles = {
		background: getCurrentBg(),
	}

	return <div style={styles} className='background'></div>
}
