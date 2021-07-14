import {useImperativeHandle, forwardRef, useState, useEffect} from 'react';
import Array from '../../Array/Array';

import {
	resetAllColors,
	setArrayColorByIndices,
	setArrayColorByRange,
} from '../../../helper/functions';
import CountingSortArray from '../../Array/CountingSortArray';
import ZeroTenArray from '../../Array/ZeroTenArray';

const DEFAULT_COLOR = '#006eff';
const CURRENT_ELEMENT_COLOR = 'gray';
const SWAP_COLOR = 'red'; //also to be used as a "to be swapped color"
const LOW_INDEX_COLOR = 'pink';
const HIGH_INDEX_COLOR = 'hotPink';
const ALREADY_COMPARED_COLOR = 'gray';
const SORTED_COLOR = 'purple';
const PIVOT_COLOR = 'yellow';

/*
steps[
    bool indicating whether it is adding values into the count arr
	index indicating which element is being looked at in arr
	index indicating which element this is for count
]
*/

const CountingRadix = forwardRef(
	({array, isSorting, updateArray, steps}, ref) => {
		const [countArr, setCountArr] = useState([]);

		useEffect(() => {
			setCountArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}, []);

		useImperativeHandle(ref, () => ({
			updateColors(index) {
				if (index !== 0) {
					resetAllColors(DEFAULT_COLOR);
				}

				let rects =
					document.getElementsByClassName('array-wrapper')[0]
						.children;
				const [isMakingNewArray, arrIndex, arrVal] = steps[index];

				if (isMakingNewArray) {
					let tempArr = [...countArr];
					tempArr[arrVal]++;
					setCountArr(tempArr);
					rects[arrIndex].style.backgroundColor =
						CURRENT_ELEMENT_COLOR;
				}
			},
			reset() {},
		}));

		const handleSwap = (index) => {};

		return (
			<>
				<CountingSortArray array={array} />
				<ZeroTenArray array={countArr} />
			</>
		);
	}
);

export default CountingRadix;
