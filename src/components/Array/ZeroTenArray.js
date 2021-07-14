import './Array.css';

const ZeroTenArray = ({array}) => {
	return (
		<div className='counting-wrapper'>
			{array.map((val, index) => (
				<div className='wrapper'>
					<div
						className='counting-bar'
						key={index}
						style={{width: '30px', height: `${val * 10}px`}}
					/>
					<p> {index} </p>
				</div>
			))}
		</div>
	);
};

export default ZeroTenArray;
