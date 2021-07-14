import './Array.css';

const CountingSortArray = ({array}) => {
	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div
					className='bar'
					key={index}
					style={{width: '30px', height: `${val * 10}px`}}
				/>
			))}
		</div>
	);
};

export default CountingSortArray;
