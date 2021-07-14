import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';
import Array from '../../Array/Array';

import {resetAllColors, resetAllSpecificColors, setArrayColorByIndices, setArrayColorByRange} from '../../../helper/functions';
import CountingSortArray from '../../Array/CountingSortArray';
import ZeroTenArray from '../../Array/ZeroTenArray';

const DEFAULT_COLOR = '#006eff';
const CURRENT_ELEMENT_COLOR = 'green';
const INSPECTING_COLOR = 'gray';
const SWAP_COLOR = 'red'; //also to be used as a "to be swapped color"
const LOW_INDEX_COLOR = 'pink';
const HIGH_INDEX_COLOR = 'hotPink';
const ALREADY_COMPARED_COLOR = 'gray';
const SORTED_COLOR = 'purple';
const PIVOT_COLOR = 'yellow';

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
	const [countArr, setCountArr] = useState([]);
	const [sortedArr, setSortedArr] = useState([]);
	const [isCountIncremented, setCountIncremented] = useState(false);

	useEffect(() => {
		setCountArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}, []);

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
				let tempArr = [];
				for (var i = 0; i < array.length; i++) tempArr.push(0);
				console.log(tempArr);
				setSortedArr(tempArr);
			}

			const [state, arrIndex, arrVal] = steps[index];

			if (state === states.makingCount) {
				//increments countArr
				let tempArr = [...countArr];
				tempArr[arrVal]++;
				setCountArr(tempArr);

				arrRects[arrIndex].style.backgroundColor = CURRENT_ELEMENT_COLOR;
			} else if (state === states.summingCount) {
				let tempArr = [...countArr];
				tempArr[arrIndex] += tempArr[arrIndex - 1];
				setCountArr(tempArr);

				countRects[arrIndex].children[0].style.backgroundColor = CURRENT_ELEMENT_COLOR;
				console.log(countRects[arrIndex].children);
				countRects[arrIndex - 1].children[0].style.backgroundColor = INSPECTING_COLOR;
			} else {
				//the first time 'isMakingNewArray' is false, we need countArr to be added up to get the right indices
				let tempCountArr = [...countArr];

				//makes a new, sorted array
				let tempSorted = [...sortedArr];
				let index = tempCountArr[arrVal] - 1;
				tempSorted[index] = arrVal;
				setSortedArr(tempSorted);

				//let tempCount = [...countArr];
				tempCountArr[arrVal]--;
				setCountArr(tempCountArr);

				sortedRects[index].style.backgroundColor = CURRENT_ELEMENT_COLOR;
			}
		},
		reset() {},
	}));

	const handleSwap = (index) => {};

	return (
		<>
			<CountingSortArray array={array} />
			<ZeroTenArray array={countArr} />
			<CountingSortArray array={sortedArr} />
		</>
	);
});

export default CountingRadix;
