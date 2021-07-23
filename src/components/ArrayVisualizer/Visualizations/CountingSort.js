import {useImperativeHandle, forwardRef, useState} from 'react';

import {resetAllColors, resetAllSpecificColors, resetAllCountColors} from '../../../helper/functions';
import CountingSortArray from '../../Arrays/CountingSortArray';
import CountArray from '../../Arrays/CountArray';
import {countColors} from '../../../constants/constants';

const {DEFAULT, CURRENT, COMPARE} = countColors;

const states = {
	makingCount: 'makingCount',
	summingCount: 'summingCount',
	sorting: 'sorting',
};

/*
steps[
    state indicating whether it is adding values into the count arr. makingCount, summingCount, sorting
	index indicating which element is being looked at in arr
	index indicating which element this is for count
]
*/

const CountingSort = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	const initialCountState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const [countArr, setCountArr] = useState([initialCountState]);
	const [sortedArr, setSortedArr] = useState([]);

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
				for (var i = 0; i < array.length; i++) setSortedArr((sortedArr) => [...sortedArr, 0]);
			}

			const [state, arrIndex, arrVal] = steps[index];

			if (state === states.makingCount) {
				//increments countArr
				let tempArr = [...countArr];
				tempArr[arrVal]++;
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
				let index = tempCountArr[arrVal] - 1;
				tempSorted[index] = arrVal;
				setSortedArr(tempSorted);

				//let tempCount = [...countArr];
				tempCountArr[arrVal]--;
				setCountArr(tempCountArr);

				arrRects[arrIndex].style.backgroundColor = COMPARE;
				countRects[arrVal].children[0].style.backgroundColor = COMPARE;
				sortedRects[index].style.backgroundColor = CURRENT;
			}
		},
		reset() {
			resetAllColors(DEFAULT);
			setCountArr(initialCountState);
			//for (var i = 0; i < array.length; i++) setSortedArr((sortedArr) => [...sortedArr, 0]);
			setSortedArr([]);
		},
		handleLastStep() {
			setTimeout(() => {
				resetAllColors(DEFAULT);
				resetAllCountColors(DEFAULT, document.getElementsByClassName('counting-wrapper')[0].children[0].children);
				resetAllSpecificColors(DEFAULT, document.getElementsByClassName('array-wrapper')[1].children);
				updateArray(array.sort((a, b) => a - b)); //can't be updating state with sortedArr on the following render
			}, 500);
		},
	}));

	return (
		<>
			<CountingSortArray array={array} />
			<CountArray array={countArr} />
			<CountingSortArray array={sortedArr} />
		</>
	);
});

export default CountingSort;
