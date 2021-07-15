import './Array.css';

const RadixSortArray = ({array, digitsPlace}) => {
	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div className='radix-bar' key={index} style={{width: '75px', height: `${val}px`}}>
					{getValWithColor(val, digitsPlace)}
				</div>
			))}
		</div>
	);
};

const getValWithColor = (val, digitsPlace) => {
	const splitNumberInThree = () => {
		let start = null;
		let changeStart = false;
		let red = null;
		let end = null;
		let changeEnd = false;
		let dp = 1;
		let temp = val;

		//get the value for end
		console.log(digitsPlace);
		let mult = 1;
		while (temp > 0 && dp !== digitsPlace) {
			if (!changeEnd) {
				end = 0;
				changeEnd = true;
			}

			end += mult * (temp % 10);
			temp = Math.floor(temp / 10);
			dp *= 10;
			mult *= 10;
		}

		//get the red value
		if (temp !== 0) {
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
	console.log(val, start, red, end);
	return (
		<p className='bar-text'>
			<span> {start !== null && start} </span>
			<span style={{color: 'red'}}>{red !== null && red}</span>
			<span> {end !== null && end} </span>
		</p>
	);
};

export default RadixSortArray;
