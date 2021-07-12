import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';
import Array from './Array';

import {
	resetAllColors,
	setArrayColorByIndices,
	setArrayColorByRange,
} from '../../../helper/functions';

const DEFAULT_COLOR = '#006eff';
const OUT_OF_RANGE_COLOR = '#a8cdff';
const SWAP_COLOR = 'red'; //also to be used as a "to be swapped color"
const LOW_INDEX_COLOR = 'pink';
const HIGH_INDEX_COLOR = 'hotPink';
const ALREADY_COMPARED_COLOR = 'gray';
const SORTED_COLOR = 'purple';
const PIVOT_COLOR = 'yellow';

/*
steps[
	index of pivot OR VALUE SWAPPED, 
	index of compared value OR VALUE SWAPPED
	0 = still looping, 1 = arr[i] > pivot or arr[j] <= pivot (set it to a "to be swapped color" to distinguish it) -1 = ignore
	boolean to indicate whether a swap is occurring (set both indices to red)
	range to indicate current section
	array of indices to indicate which elements are already in sorted position
	array of indices to indicate which elements have already been looked at in the current iteration 
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
			const [
				pivotIndex,
				lowAndHighPointer,
				comparisonIndicator,
				swap,
				range,
				lookedAt,
				sorted,
			] = steps[index];
			//handle sorted case later

			if (index !== 0) {
				handleSwap(index - 1);
			}

			if (range !== currentRange) {
			}

			//sets colors in and out of current partition
			setArrayColorByRange(
				range[0],
				range[1],
				DEFAULT_COLOR,
				OUT_OF_RANGE_COLOR
			);

			//set colors that have already been looked at
			setArrayColorByIndices(lookedAt, ALREADY_COMPARED_COLOR);

			//set colors for indices that are already sorted
			setArrayColorByIndices(sorted, SORTED_COLOR);

			rects[pivotIndex].style.backgroundColor = PIVOT_COLOR;

			if (comparisonIndicator === 0 || comparisonIndicator === 1) {
				rects[lowAndHighPointer[0]].style.backgroundColor =
					LOW_INDEX_COLOR;
				rects[lowAndHighPointer[1]].style.backgroundColor =
					HIGH_INDEX_COLOR;
			} else if (comparisonIndicator === 1) {
				//found a value for i or j and is no longer looping
			} else {
				rects[lowAndHighPointer[0]].style.backgroundColor = SWAP_COLOR;
				rects[lowAndHighPointer[1]].style.backgroundColor = SWAP_COLOR;
			}

			//handleSwap(index);

			if (index + 1 === steps.length) {
				handleSwap(index);
			}
		},
		reset() {
			setReset(true);
		},
	}));

	const handleSwap = (index) => {
		const swap = steps[index][3];

		if (swap) {
			const [index1, index2] = steps[index][1];
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
