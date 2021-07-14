import {useImperativeHandle, forwardRef} from 'react';
import {resetAllColors} from '../../../helper/functions';
import Array from '../../Array/Array';

const DEFAULT_COLOR = '#006eff';
const CURRENT_INDEX_COLOR = 'green';
const CURRENT_COMPARISON_COLOR = 'grey';
const SWAP_COLOR = 'red';

/*
steps[
	the current index in the outer loop,
	index being compared to,
	boolean: whether the two elements are swapped or not
]
*/

const Basic = forwardRef(({array, isSorting, updateArray, steps}, ref) => {
	// const [reset, setReset] = useState(false);

	useImperativeHandle(ref, () => ({
		updateColors(index) {
			if (index !== 0) {
				resetAllColors(DEFAULT_COLOR);
				swapPreviousComparison(index - 1, updateArray);
			}

			let rects = document.getElementsByClassName('array-wrapper')[0].children;
			console.log(steps);
			const [currIndex, compareIndex, isSwapped] = steps[index];
			const currStyle = rects[currIndex].style;
			const compareStyle = rects[compareIndex].style;

			//adjust colors
			currStyle.backgroundColor = CURRENT_INDEX_COLOR;
			if (!isSwapped) {
				compareStyle.backgroundColor = CURRENT_COMPARISON_COLOR;
			} else {
				compareStyle.backgroundColor = SWAP_COLOR;
			}
		},
		reset() {
			resetAllColors(DEFAULT_COLOR);
		},
		handleLastStep() {
			this.reset();
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
