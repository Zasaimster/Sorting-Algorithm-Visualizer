import './Array.css';

const CountArray = ({array}) => {
	return (
		<div className='counting-wrapper'>
			<div className='counting-wrapper2'>
				{array.map((val, index) => (
					<div className='wrapper' key={index}>
						<div className='counting-bar' style={{width: '30px', height: `${val * 7}px`}} />
						<p> {index} </p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CountArray;
