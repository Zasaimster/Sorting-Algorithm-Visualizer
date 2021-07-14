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
    
]
*/

const CountingRadix = forwardRef(
	({array, isSorting, updateArray, steps}, ref) => {
		useImperativeHandle(ref, () => ({
			updateColors(index) {},
			reset() {},
		}));

		const handleSwap = (index) => {};

		return (
			<>
				<Array array={array} />
			</>
		);
	}
);

export default CountingRadix;
