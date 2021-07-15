import {useImperativeHandle, forwardRef, useState} from 'react';

import {resetAllColors, resetAllSpecificColors} from '../../../helper/functions';
import CountingSortArray from '../../Array/CountingSortArray';

import Array from '../../Array/Array';
import CountArray from '../../Array/CountArray';
import RadixSortArray from '../../Array/RadixSortArray';

const DEFAULT_COLOR = '#006eff';
const CURRENT_ELEMENT_COLOR = 'green';
const INSPECTING_COLOR = 'gray';

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
	const [countArr, setCountArr] = useState([initialCountState]);
	const [sortedArr, setSortedArr] = useState([]);
	const [digitsPlace, setDigitsPlace] = useState(1);

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
		},
		reset() {},
		handleLastStep() {},
	}));

	return (
		<>
			<RadixSortArray array={array} />
			<CountArray array={countArr} />
			<RadixSortArray array={sortedArr} digitsPlace={digitsPlace} />
		</>
	);
});

export default RadixSort;
