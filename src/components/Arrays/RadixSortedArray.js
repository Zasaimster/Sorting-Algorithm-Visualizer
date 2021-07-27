import {useWindowSize} from '../../hooks/useWindowSize';

import './Array.css';

const RadixSorted = ({array}) => {
	const numRows = useWindowSize(array, 'radixSort')[1];

	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div className='radix-bar' key={index} style={{width: '75px', height: `${val / 3 / numRows}px`}}>
					<p className='bar-text'>{val !== 0 && val}</p>
				</div>
			))}
		</div>
	);
};

export default RadixSorted;
