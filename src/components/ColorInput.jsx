import { useState } from 'react'

export default function ColorInput() {
	const [firstColorHue, setFirstColorHue] = useState(162)
	const styles = {
		background: `linear-gradient(135deg, hsl(${firstColorHue},66%, 19%) 0%, hsl(${firstColorHue},75%,8%) 100%)`,
	}
	const changeColor = e => {
		setFirstColorHue(e.target.value)
	}
	return (
		<div style={styles}>
			<input onChange={changeColor} className='inpucik' type='range' min='0' max='360' value={firstColorHue} />
		</div>
	)
}
