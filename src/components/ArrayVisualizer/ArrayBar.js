import './ArrayBar.css';

const ArrayBar = ({val}) => {
	return (
		//change this to divs with a background color style
		<svg width='10' height={val} className='bar-wrapper'>
			<rect width='10' height={val} className='bar' />
		</svg>
	);
};

export default ArrayBar;
