import {useImperativeHandle, forwardRef, useState} from 'react';
import {resetAllColors} from '../../../helper/functions';
import Array from '../../Arrays/Array';
import {basicColors} from '../../../constants/constants';

const {DEFAULT, CURRENT, COMPARISON, SWAP} = basicColors;

/*
steps[
	the current index in the outer loop,
	index being compared to,
	boolean: whether the two elements are swapped or not
]
*/

const Basic = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	const [isReset, setIsReset] = useState(true);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			if (isReset) setIsReset(false);

			if (index !== 0) {
				resetAllColors(DEFAULT);
				swapPreviousComparison(index - 1, updateArray);
			}

			let rects = document.getElementsByClassName('array-wrapper')[0].children;

			const [currIndex, compareIndex, isSwapped] = steps[index];
			const currStyle = rects[currIndex].style;
			const compareStyle = rects[compareIndex].style;

			//adjust colors
			currStyle.backgroundColor = CURRENT;
			if (!isSwapped) {
				compareStyle.backgroundColor = COMPARISON;
			} else {
				compareStyle.backgroundColor = SWAP;
			}
		},
		reset() {
			if (!isReset) {
				resetAllColors(DEFAULT);
				setIsReset(true);
			}
		},
		handleLastStep() {
			swapPreviousComparison(steps.length - 1, updateArray);
			setTimeout(() => {
				resetAllColors(DEFAULT);
			}, 100);
			//this.reset();
		},
	}));

	const swapPreviousComparison = (index) => {
		const [currIndex, compareIndex, isSwapped] = steps[index];

		if (isSwapped) {
			let updatedArray = [...array];
			const tmp = updatedArray[compareIndex];
			updatedArray[compareIndex] = updatedArray[currIndex];
			updatedArray[currIndex] = tmp;

			updateArray(updatedArray);
		}
	};

	return <Array array={array} />;
});

export default Basic;
