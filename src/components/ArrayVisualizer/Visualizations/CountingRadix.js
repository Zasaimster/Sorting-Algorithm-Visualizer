import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';
import {isCompositeComponentWithType} from 'react-dom/cjs/react-dom-test-utils.production.min';

import {resetAllColors, resetAllSpecificColors} from '../../../helper/functions';
import CountingSortArray from '../../Array/CountingSortArray';
import ZeroTenArray from '../../Array/ZeroTenArray';

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
    state indicating whether it is adding values into the count arr. makingCount, summingCount, sorting
	index indicating which element is being looked at in arr
	index indicating which element this is for count
]
*/

const CountingRadix = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	const initialCountState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const [countArr, setCountArr] = useState([initialCountState]);
	const [sortedArr, setSortedArr] = useState([]);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			console.log(countArr);
			let arrRects = document.getElementsByClassName('array-wrapper')[0].children;
			let countRects = document.getElementsByClassName('counting-wrapper')[0].children;
			let sortedRects = document.getElementsByClassName('array-wrapper')[1].children;

			if (index !== 0) {
				resetAllColors(DEFAULT_COLOR);
				resetAllSpecificColors(DEFAULT_COLOR, countRects);
				resetAllSpecificColors(DEFAULT_COLOR, sortedRects);
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

				arrRects[arrIndex].style.backgroundColor = CURRENT_ELEMENT_COLOR;
			} else if (state === states.summingCount) {
				console.log(countArr);
				let tempArr = [...countArr];
				tempArr[arrIndex] += tempArr[arrIndex - 1];
				setCountArr(tempArr);

				console.log(sortedArr);
				countRects[arrIndex].children[0].style.backgroundColor = CURRENT_ELEMENT_COLOR;
				console.log(countRects[arrIndex].children);
				countRects[arrIndex - 1].children[0].style.backgroundColor = INSPECTING_COLOR;
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

				arrRects[arrIndex].style.backgroundColor = INSPECTING_COLOR;
				countRects[arrVal].children[0].style.backgroundColor = INSPECTING_COLOR;
				console.log(index);
				console.log(sortedRects[index]);
				sortedRects[index].style.backgroundColor = CURRENT_ELEMENT_COLOR;
			}
		},
		reset() {
			console.log('what');
			resetAllColors(DEFAULT_COLOR);
			setCountArr(initialCountState);
			//for (var i = 0; i < array.length; i++) setSortedArr((sortedArr) => [...sortedArr, 0]);
			setSortedArr([]);
		},
		handleLastStep() {
			/*setTimeout(() => {
				this.reset();
			}, 500);*/
			resetAllColors(DEFAULT_COLOR);
			resetAllSpecificColors(DEFAULT_COLOR, document.getElementsByClassName('counting-wrapper')[0].children);
			resetAllSpecificColors(DEFAULT_COLOR, document.getElementsByClassName('array-wrapper')[1].children);
		},
	}));

	return (
		<>
			<CountingSortArray array={array} />
			<ZeroTenArray array={countArr} />
			<CountingSortArray array={sortedArr} />
		</>
	);
});

export default CountingRadix;
