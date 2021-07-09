import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';
import Array from './Array';

import {
	resetAllColors,
	setArrayColorByIndices,
	setArrayColorByRange,
} from '../../../helper/functions';

const DEFAULT_COLOR = '#006eff';
const OUT_OF_RANGE_COLOR = '#a8cdff';
const SMALL_COLOR = 'green';
const COMPARE_COLOR = 'grey';
const SORTED_COLOR = 'purple';
const PIVOT_COLOR = 'yellow';

/*
steps[
	index of pivot OR VALUE SWAPPED, 
	index of compared value OR VALUE SWAPPED
	0 = still looping, 1 = arr[i] > pivot or arr[j] <= pivot (set it to a color to distinguish it) -1 = ignore
	boolean to indicate whether a swap is occurring (set both indices to a certain color)
	range to indicate current section
]
*/

const QuickSort = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	const [reset, setReset] = useState(false);
	const [currentRange, setCurrentRange] = useState([-1, -1]);

	//useEffect(() => console.log(subArray), [subArray]);
	//useEffect(() => console.log(sortedIndices), [sortedIndices]);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			let rects =
				document.getElementsByClassName('array-wrapper')[0].children;
			const [index1, index2, comparisonIndicator, swap, range] =
				steps[index];
			//handle sorted case later

			if (range !== currentRange) {
			}

			setArrayColorByRange(
				range[0],
				range[1],
				DEFAULT_COLOR,
				OUT_OF_RANGE_COLOR
			);

			rects[index1].style.backgroundColor = PIVOT_COLOR;
			rects[index2].style.backgroundColor = COMPARE_COLOR;

			handleSwap(index);
		},
		reset() {
			setReset(true);
		},
	}));

	const sortPreviousSection = (index) => {};

	const handleSwap = (index) => {
		const swap = steps[index][3];

		if (swap) {
			const [index1, index2] = steps[index];
			let updatedArray = [...array];
			const tmp = updatedArray[index1];
			updatedArray[index1] = updatedArray[index2];
			updatedArray[index2] = tmp;

			updateArray(updatedArray);
		}
	};

	return (
		<>
			<Array array={array} />
		</>
	);
});

export default QuickSort;
