import {useImperativeHandle, forwardRef, useState} from 'react';
import Array from '../../Arrays/Array';

import {resetAllColors, setArrayColorByIndices, setArrayColorByRange} from '../../../helper/functions';
import {mergeDescription} from '../../../constants/constants';

const {
	DEFAULT: {color: DEFAULT},
	OUT_OF_RANGE: {color: OUT_OF_RANGE},
	SMALL: {color: SMALL},
	BIG: {color: BIG},
	SORTED: {color: SORTED},
} = mergeDescription;

/*
steps[
	index of smaller value, 
	index of bigger value (defaults to -1 if one of the arrays have been expended), 
	current range of values being sorted together
]
*/

const MergeSort = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	const [subArray, setSubArray] = useState([]);
	const [currentRange, setCurrentRange] = useState([-1, -1]);
	//const [reset, setReset] = useState(false);

	// useEffect(() => {
	// 	if (subArray.length === 0) {
	// 		console.log('subArr is empty');
	// 	}
	// 	console.log(subArray);
	// }, [subArray]);

	// useEffect(() => {
	// 	if (reset) {
	// 		setReset(false);
	// 	}
	// }, [reset]);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			let rects = document.getElementsByClassName('array-wrapper')[0].children;
			const [smallIndex, bigIndex, range, sorted] = steps[index];
			if (range !== currentRange) {
				setCurrentRange(range);
				setSubArray([]);
				sortPreviousSection(index - 1, steps);
			}
			pushNewBar(steps[index]);

			setArrayColorByRange(range[0], range[1], DEFAULT, OUT_OF_RANGE);

			setArrayColorByIndices(sorted, SORTED);

			rects[smallIndex].style.backgroundColor = SMALL;
			if (bigIndex !== -1) {
				rects[bigIndex].style.backgroundColor = BIG;
			}

			if (index + 1 === steps.length) {
			}
		},
		reset() {
			resetAllColors(DEFAULT);
			setSubArray([]);
		},
		handleLastStep() {
			sortPreviousSection(steps.length - 1);
			resetAllColors(DEFAULT);
			//get rid of bottom array after half a second
			setTimeout(() => {
				setSubArray([]);
			}, 500);
		},
	}));

	const sortPreviousSection = (index) => {
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

		setSubArray((subArray) => [...subArray, array[smallIndex]]);
	};

	return (
		<>
			<Array algorithm='mergeSort' array={array} />
			<Array algorithm='mergeSort' array={subArray} maxHeight={Math.max(...array)} />
		</>
	);
});

export default MergeSort;
