import {useEffect, useLayoutEffect, useState} from 'react';

export function useWindowSize(array) {
	const [widthAndRows, setWidthAndRows] = useState([10, 1]);

	const getRows = (barWidth) => {
		let numRows = 1;
		let totalWidth = (barWidth + 3) * array.length;
		if (totalWidth > window.innerWidth) {
			numRows = Math.ceil(totalWidth / window.innerWidth);
		}

		return numRows;
	};

	useLayoutEffect(() => {
		console.log('init layout');
		//setArray(arr);
		function updateSize() {
			let barWidth = 10;
			if (window.innerWidth < 400) {
				barWidth = 4;
			} else if (window.innerWidth < 1000) {
				barWidth = 7;
			}

			let numRows = getRows(barWidth);
			setWidthAndRows([barWidth, numRows]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, [array]); //

	useEffect(() => {
		let width = widthAndRows[0];
		let rows = widthAndRows[1];

		if (rows !== getRows(width)) setWidthAndRows([width, getRows(width)]);
	});

	return widthAndRows;
}
