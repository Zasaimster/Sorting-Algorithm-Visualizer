import './Array.css';

const RadixSortArray = ({array, digitsPlace}) => {
	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div className='radix-bar' key={index} style={{width: '75px', height: `${val}px`}}>
					<p className='bar-text'> {val} </p>
				</div>
			))}
		</div>
	);
};

export default RadixSortArray;
