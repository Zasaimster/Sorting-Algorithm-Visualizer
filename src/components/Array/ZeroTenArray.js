import './Array.css';

const ZeroTenArray = ({array}) => {
	return (
		<div className='counting-wrapper'>
			{array.map((val, index) => (
				<div className='wrapper' key={index}>
					<div className='counting-bar' style={{width: '30px', height: `${val * 10}px`}} />
					<p> {index} </p>
				</div>
			))}
		</div>
	);
};

export default ZeroTenArray;
