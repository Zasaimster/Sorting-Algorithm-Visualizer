import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';
import Array from './Array';

import {setArrayColorByRange} from '../../../helper/functions';

const IN_RANGE_COLOR = '#006eff';
const OUT_OF_RANGE_COLOR = '#a8cdff';
const SMALL_COLOR = 'green';
const BIG_COLOR = 'grey';
const SORTED_COLOR = 'purple';

/*
steps[
	index of smaller value, 
	index of bigger value (defaults to -1 if one of the arrays have been expended), 
	current range of values being sorted together
]
*/

const MergeSort = forwardRef(({array, isSorting, updateArray}, ref) => {
	const [subArray, setSubArray] = useState([]);
	const [currentRange, setCurrentRange] = useState([-1, -1]);
	useEffect(() => console.log(subArray), [subArray]);

	useImperativeHandle(ref, () => ({
		updateColors(index, steps) {
			let rects =
				document.getElementsByClassName('array-wrapper')[0].children;
			const [smallIndex, bigIndex, range] = steps[index];

			if (range !== currentRange) {
				setCurrentRange(range);
				setSubArray([]);
				sortPreviousSection(index - 1, steps);
				//console.log('yo');
			}
			pushNewBar(steps[index]);

			setArrayColorByRange(
				range[0],
				range[1],
				IN_RANGE_COLOR,
				OUT_OF_RANGE_COLOR
			);

			rects[smallIndex].style.backgroundColor = SMALL_COLOR;
			if (bigIndex !== -1) {
				rects[bigIndex].style.backgroundColor = BIG_COLOR;
			}
		},
	}));

	const resetPreviousColors = (index, steps) => {};

	const sortPreviousSection = (index, steps) => {
		if (index < 0) return;

		const [start, end] = steps[index][2];
		let tempArr = [...array];
		let tempSlice = array.slice(start, end + 1);
		tempSlice.sort((a, b) => a - b);
		for (var i = start, j = 0; i <= end; i++, j++) {
			tempArr[i] = tempSlice[j];
		}

		updateArray(tempArr);
	};

	const pushNewBar = (step) => {
		let smallIndex = step[0];
		let bigIndex = step[1];

		console.log(array[smallIndex], array[bigIndex]);
		setSubArray((subArray) => [...subArray, array[smallIndex]]);
	};

	return (
		<>
			<Array array={array} />
			<Array array={subArray} />
		</>
	);
});

export default MergeSort;
