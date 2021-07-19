import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';

import {resetAllColors, resetAllSpecificColors} from '../../../helper/functions';
import CountingSortArray from '../../Arrays/CountingSortArray';

import Array from '../../Arrays/Array';
import CountArray from '../../Arrays/CountArray';
import RadixArray from '../../Arrays/RadixArray';
import RadixSortedArray from '../../Arrays/RadixSortedArray';

const DEFAULT_COLOR = '#006eff';
const CURRENT_ELEMENT_COLOR = 'green';
const INSPECTING_COLOR = 'gray';

const states = {
	makingCount: 'makingCount',
	summingCount: 'summingCount',
	sorting: 'sorting',
};

/*
steps[
	state indicating whether it is adding values into the count arr
	index indicating which element is being looked at in arr
	index indicating which element this is for count
	value indicating number place
]
*/

const RadixSort = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	const initialCountState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const [countArr, setCountArr] = useState(initialCountState);
	const [sortedArr, setSortedArr] = useState([]);
	const [digitsPlace, setDigitsPlace] = useState(1);
	const [newDigitIndicator, setIndicator] = useState(false); //use this indicator to tell the code when to use a new count array

	useEffect(() => {
		//console.log(countArr);
	}, [countArr]);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			let arrRects = document.getElementsByClassName('array-wrapper')[0].children;
			let countRects = document.getElementsByClassName('counting-wrapper')[0].children;
			let sortedRects = document.getElementsByClassName('array-wrapper')[1].children;

			if (index !== 0) {
				resetAllColors(DEFAULT_COLOR);
				resetAllSpecificColors(DEFAULT_COLOR, countRects);
				resetAllSpecificColors(DEFAULT_COLOR, sortedRects);
			}

			if (sortedArr.length === 0) {
				resetSorted();
			}

			const [state, arrIndex, arrVal, digit] = steps[index];
			console.log(steps[index]);
			const digitVal = Math.floor(arrVal / digit) % 10;

			if (digit !== digitsPlace) {
				console.log('YOOOOOO');
				setDigitsPlace(digit);
				updateArray([...sortedArr]);
				resetSorted();
			}

			//extract current digit in number

			//console.log(state);
			if (state === states.makingCount) {
				//increments countArr
				let tempArr;
				//temp solution unless I cant figure out anything better
				if (newDigitIndicator) {
					tempArr = initialCountState;
					setIndicator(false);
				} else {
					tempArr = [...countArr];
				}
				tempArr[digitVal]++;
				setCountArr(tempArr);

				arrRects[arrIndex].style.backgroundColor = CURRENT_ELEMENT_COLOR;
			} else if (state === states.summingCount) {
				let tempArr = [...countArr];
				tempArr[arrIndex] += tempArr[arrIndex - 1];
				setCountArr(tempArr);

				countRects[arrIndex].children[0].style.backgroundColor = CURRENT_ELEMENT_COLOR;
				countRects[arrIndex - 1].children[0].style.backgroundColor = INSPECTING_COLOR;
			} else {
				//makes a new, sorted array
				let tempSorted = [...sortedArr];
				let tempCountArr = [...countArr];
				let currIndex = tempCountArr[digitVal] - 1;
				tempSorted[currIndex] = arrVal;
				setSortedArr(tempSorted);

				//let tempCount = [...countArr];
				tempCountArr[digitVal]--;
				setCountArr(tempCountArr);

				arrRects[arrIndex].style.backgroundColor = INSPECTING_COLOR;
				countRects[digitVal].children[0].style.backgroundColor = INSPECTING_COLOR;
				sortedRects[currIndex].style.backgroundColor = CURRENT_ELEMENT_COLOR;

				//temp solution unless I cant figure out anything better
				if (index < steps.length && steps[index + 1][3] !== digitsPlace) {
					setIndicator(true);
				}
			}

			// if (index < steps.length && steps[index + 1][3] !== digitsPlace) {
			// 	setDigitsPlace(digit);
			// 	setCountArr(initialCountState);
			// 	resetSorted();
			// }
		},
		reset() {},
		handleLastStep() {},
	}));

	const resetSorted = () => {
		console.log('?');
		setSortedArr([]);
		for (var i = 0; i < array.length; i++) setSortedArr((sortedArr) => [...sortedArr, 0]);
	};

	return (
		<>
			<RadixArray array={array} digitsPlace={digitsPlace} />
			<CountArray array={countArr} />
			<RadixSortedArray array={sortedArr} />
		</>
	);
});

export default RadixSort;
