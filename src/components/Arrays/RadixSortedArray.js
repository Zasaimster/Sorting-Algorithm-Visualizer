import './Array.css';

const RadixSorted = ({array}) => {
	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div className='radix-bar' key={index} style={{width: '75px', height: `${val}px`}}>
					<p className='bar-text'>{val !== 0 && val}</p>
				</div>
			))}
		</div>
	);
};

export default RadixSorted;
