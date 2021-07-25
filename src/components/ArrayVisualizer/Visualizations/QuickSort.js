import {useImperativeHandle, forwardRef} from 'react';
import Array from '../../Arrays/Array';

import {resetAllColors, setArrayColorByIndices, setArrayColorByRange} from '../../../helper/functions';
import {quickDescription} from '../../../constants/constants';

const {
	DEFAULT: {color: DEFAULT},
	OUT_OF_RANGE: {color: OUT_OF_RANGE},
	SWAP: {color: SWAP},
	LOW: {color: LOW},
	HIGH: {color: HIGH},
	COMPARED: {color: COMPARED},
	SORTED: {color: SORTED},
	PIVOT: {color: PIVOT},
} = quickDescription;

/*
steps[
	index of pivot OR VALUE SWAPPED, 
	index of compared value OR VALUE SWAPPED
	0 = still looking for values to swap, -1 = a swap is occurring
	range to indicate current section
	array of indices to indicate which elements are already in sorted position
	array of indices to indicate which elements have already been looked at in the current iteration 
]
*/

const QuickSort = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	//useEffect(() => console.log(subArray), [subArray]);
	//useEffect(() => console.log(sortedIndices), [sortedIndices]);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			let rects = document.getElementsByClassName('array-wrapper')[0].children;
			const [pivotIndex, lowAndHighPointer, comparisonIndicator, range, lookedAt, sorted] = steps[index];
			//handle sorted case later

			if (index !== 0) {
				handleSwap(index - 1);
			}

			//sets colors in and out of current partition
			setArrayColorByRange(range[0], range[1], DEFAULT, OUT_OF_RANGE);

			//set colors that have already been looked at
			setArrayColorByIndices(lookedAt, COMPARED);

			//set colors for indices that are already sorted
			setArrayColorByIndices(sorted, SORTED);

			rects[pivotIndex].style.backgroundColor = PIVOT;
			const [low, high] = lowAndHighPointer;
			if (comparisonIndicator === 0) {
				console.log(lowAndHighPointer[0]);
				if (low < array.length) rects[low].style.backgroundColor = LOW;
				rects[high].style.backgroundColor = HIGH;
			} else if (comparisonIndicator === -1) {
				if (low < array.length) rects[low].style.backgroundColor = SWAP;
				rects[high].style.backgroundColor = SWAP;
			}
		},
		reset() {
			resetAllColors(DEFAULT);
		},
		handleLastStep() {
			handleSwap(steps.length - 1);
			resetAllColors(SORTED);
			setTimeout(() => {
				resetAllColors(DEFAULT);
			}, 500);
		},
	}));

	const handleSwap = (index) => {
		const swap = steps[index][2];

		if (swap === -1) {
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
