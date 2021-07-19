import './Array.css';

const Array = ({array}) => {
	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div
					className='bar'
					key={index}
					style={{width: '10px', height: `${val}px`}}
				/>
			))}
		</div>
	);
};

export default Array;
