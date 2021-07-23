import './Array.css';

const RadixArray = ({array, digitsPlace, textColor}) => {
	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div className='radix-bar' key={index} style={{width: '75px', height: `${val / 3}px`}}>
					{getValWithColor(val, digitsPlace, textColor)}
				</div>
			))}
		</div>
	);
};

//there's probably a superior way to implement this
const getValWithColor = (val, digitsPlace, textColor) => {
	const splitNumberInThree = () => {
		if (digitsPlace === 0) {
			return [val, null, null];
		}
		let start = null;
		let changeStart = false;
		let red = null;
		let end = null;
		let changeEnd = false;
		let dp = 1;
		let temp = val;

		//get the value for end
		let mult = 1;
		while (temp > 0 && dp !== digitsPlace) {
			if (!changeEnd) {
				end = 0;
				changeEnd = true;
			}
			let toAdd = mult * (temp % 10);
			if (toAdd === 0 && mult !== 1) {
				end = toAdd.toString() + end.toString();
			} else {
				end += toAdd;
			}
			temp = Math.floor(temp / 10);
			dp *= 10;
			mult *= 10;
		}

		//get the red value
		if (temp !== 0) {
			//if temp is null, ignore this
			red = temp % 10;
			temp = Math.floor(temp / 10);
			dp *= 10;
		}

		//assign value for start
		mult = 1;
		while (temp > 0) {
			if (!changeStart) {
				start = 0;
				changeStart = true;
			}
			start += mult * (temp % 10);
			temp = Math.floor(temp / 10);
			dp *= 10;
			mult *= 10;
		}

		return [start, red, end];
	};

	const [start, red, end] = splitNumberInThree();
	return (
		<p className='bar-text'>
			<span> {start !== null && start} </span>
			<span style={{color: `${textColor}`}}>{red !== null && red}</span>
			<span> {end !== null && end} </span>
		</p>
	);
};

export default RadixArray;
