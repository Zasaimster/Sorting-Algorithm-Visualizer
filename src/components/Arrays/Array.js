import {useWindowSize} from '../../hooks/useWindowSize';

import './Array.css';

const Array = ({algorithm, array}) => {
	//const [barWidth, setBarWidth] = useState(10);
	//const [numRows, setNumRows] = useState(1);
	const [barWidth, numRows] = useWindowSize(array);
	/*
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 400) {
				setBarWidth(5);
			} else if (window.innerWidth < 1000) {
				setBarWidth(7);
			} else {
				setBarWidth(10);
			}
			//if (Math.ceil((barWidth + 3) * array.length) / window.innerWidth !== numRows)
			//setNumRows(Math.ceil((barWidth + 3) * array.length) / window.innerWidth);
		};
		window.addEventListener('resize', () => {
			handleResize();
			//extremely laggy
			//checkWidth();
		});

		window.removeEventListener('resize', () => {
			console.log('after it ends?');
		});

		const checkWidth = () => {
			let totalWidth = (barWidth + 3) * array.length;
			let totalHeight = 500 / numRows;
			if (totalWidth > window.innerWidth) {
				setNumRows(Math.ceil(totalWidth / window.innerWidth));
			} else {
				setNumRows(1);
			}
		};

		checkWidth();
	});
	*/

	//offset height isn't initialized right away so it gets an error. It'll work after the first time loading the page, though
	//const navHeight = document.getElementById('nav') === null ? DEFAULT_NAV_HEIGHT : document.getElementById('nav').offsetHeight;

	//const subConst = algorithm === 'mergeSort' ? 0 : 0;

	window.onload = () => {
		let bars = document.getElementsByClassName('bar');
		console.log(bars);

		document.getElementsByClassName('array-wrapper')[0].className += ' loaded';
		for (var i = 0; i < bars.length; i++) {
			let bar = bars[i];
			bar.className += ' loaded';
		}

		//document.getElementsByClassName('array-wrapper')[0].className += ' loaded';
	};

	const divider = algorithm === 'mergeSort' ? 2 : 1;
	return (
		<div className='array-wrapper'>
			{array.map((val, index) => (
				<div className='bar' key={index} style={{width: `${barWidth}px`, height: `${val / numRows / divider}px`}} />
			))}
			{console.log('finished drawing the stuff')}
		</div>
	);
};

export default Array;
