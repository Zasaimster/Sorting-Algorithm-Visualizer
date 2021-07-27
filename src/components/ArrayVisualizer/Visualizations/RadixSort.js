import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';

import {resetAllColors, resetAllSpecificColors, resetAllCountColors} from '../../../helper/functions';

import CountArray from '../../Arrays/CountArray';
import RadixArray from '../../Arrays/RadixArray';
import RadixSortedArray from '../../Arrays/RadixSortedArray';
import {radixDescription} from '../../../constants/constants';

const {
	DEFAULT: {color: DEFAULT},
	CURRENT: {color: CURRENT},
	COMPARE: {color: COMPARE},
	TEXT: {color: TEXT},
} = radixDescription;

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
	const [digitsPlace, setDigitsPlace] = useState(0);
	const [newDigitIndicator, setIndicator] = useState(false); //use this indicator to tell the code when to use a new count array

	useEffect(() => {
		//console.log(countArr);
	}, [countArr]);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			let arrRects = document.getElementsByClassName('array-wrapper')[0].children;
			let countRects = document.getElementsByClassName('counting-wrapper')[0].children[0].children;
			let sortedRects = document.getElementsByClassName('array-wrapper')[1].children;

			if (index !== 0) {
				resetAllColors(DEFAULT);
				resetAllCountColors(DEFAULT, countRects);
				resetAllSpecificColors(DEFAULT, sortedRects);
			}

			if (sortedArr.length === 0) {
				resetSorted();
			}

			const [state, arrIndex, arrVal, digit] = steps[index];
			const digitVal = Math.floor(arrVal / digit) % 10;

			if (digit !== digitsPlace) {
				if (digitsPlace !== 0) updateArray([...sortedArr]);
				setDigitsPlace(digit);
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

				arrRects[arrIndex].style.backgroundColor = CURRENT;
			} else if (state === states.summingCount) {
				let tempArr = [...countArr];
				tempArr[arrIndex] += tempArr[arrIndex - 1];
				setCountArr(tempArr);

				countRects[arrIndex].children[0].style.backgroundColor = CURRENT;
				countRects[arrIndex - 1].children[0].style.backgroundColor = COMPARE;
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

				arrRects[arrIndex].style.backgroundColor = COMPARE;
				countRects[digitVal].children[0].style.backgroundColor = COMPARE;
				//sortedRects[currIndex].children[0].style.backgroundColor = CURRENT;
				sortedRects[currIndex].style.backgroundColor = CURRENT;

				//temp solution unless I cant figure out anything better
				if (index + 1 < steps.length && steps[index + 1][3] !== digitsPlace) {
					setIndicator(true);
				}
			}

			// if (index < steps.length && steps[index + 1][3] !== digitsPlace) {
			// 	setDigitsPlace(digit);
			// 	setCountArr(initialCountState);
			// 	resetSorted();
			// }
		},
		reset() {
			resetAllColors(DEFAULT);
			setCountArr(initialCountState);
			setSortedArr([]);
		},
		handleLastStep() {
			setTimeout(() => {
				resetAllColors(DEFAULT);
				resetAllCountColors(DEFAULT, document.getElementsByClassName('counting-wrapper')[0].children[0].children);
				resetAllSpecificColors(DEFAULT, document.getElementsByClassName('array-wrapper')[1].children);
				updateArray(array.sort((a, b) => a - b));
				setDigitsPlace(0);
			}, 500);
		},
	}));

	const resetSorted = () => {
		setSortedArr([]);
		for (var i = 0; i < array.length; i++) setSortedArr((sortedArr) => [...sortedArr, 0]);
	};

	return (
		<>
			<RadixArray array={array} digitsPlace={digitsPlace} textColor={TEXT} />
			<CountArray array={countArr} />
			<RadixSortedArray array={sortedArr} />
		</>
	);
});

export default RadixSort;
