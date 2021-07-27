import {useEffect, useLayoutEffect, useState} from 'react';

export function useWindowSize(array, algorithm) {
	const [widthAndRows, setWidthAndRows] = useState([10, 1]);
	const [totalPadding, setTotalPadding] = useState(0);

	const getRows = (barWidth) => {
		let numRows = 1;
		let totalWidth = algorithm !== 'radixSort' ? (barWidth + 3) * array.length : (75 + 15) * array.length;
		console.log(totalWidth, totalPadding);
		if (totalWidth > window.innerWidth - totalPadding) {
			numRows = Math.ceil(totalWidth / (window.innerWidth - totalPadding));
		}

		return numRows;
	};

	useLayoutEffect(() => {
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [array, totalPadding]); //

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		let width = widthAndRows[0];
		let rows = widthAndRows[1];

		let wrapper = document.getElementsByClassName('array-wrapper');
		let padding =
			parseInt(getComputedStyle(wrapper[0]).getPropertyValue('padding-left')) +
			parseInt(getComputedStyle(wrapper[0]).getPropertyValue('padding-right'));
		if (padding !== totalPadding) setTotalPadding(padding);

		if (rows !== getRows(width)) setWidthAndRows([width, getRows(width)]);
	});

	return widthAndRows;
}
