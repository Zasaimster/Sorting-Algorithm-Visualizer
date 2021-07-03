import {useImperativeHandle, forwardRef} from 'react';
import Array from './Array';

const DEFAULT_COLOR = '#006eff';
const CURRENT_INDEX_COLOR = 'green';
const CURRENT_COMPARISON_COLOR = 'grey';
const SWAP_COLOR = 'red';

const Basic = forwardRef(({array, isSorting, updateArray}, ref) => {
	useImperativeHandle(ref, () => ({
		updateColors(index, steps) {
			if (index !== 0) resetPreviousColors(index, steps);

			let rects =
				document.getElementsByClassName('array-wrapper')[0].children;
			const [currIndex, compareIndex, isSwapped] = steps[index];
			const currStyle = rects[currIndex].style;
			const compareStyle = rects[compareIndex].style;

			//adjust colors
			currStyle.backgroundColor = CURRENT_INDEX_COLOR;
			if (!isSwapped) {
				compareStyle.backgroundColor = CURRENT_COMPARISON_COLOR;
			} else {
				compareStyle.backgroundColor = SWAP_COLOR;

				//swap array elements
				let updatedArray = [...array];
				const tmp = updatedArray[compareIndex];
				updatedArray[compareIndex] = updatedArray[currIndex];
				updatedArray[currIndex] = tmp;

				updateArray(updatedArray);
			}

			if (index + 1 === steps.length)
				resetPreviousColors(index + 1, steps);
		},
	}));

	const resetPreviousColors = (index, steps) => {
		let rects =
			document.getElementsByClassName('array-wrapper')[0].children;
		const [currIndex, compareIndex] = steps[index - 1];
		const currStyle = rects[currIndex].style;
		const compareStyle = rects[compareIndex].style;

		currStyle.backgroundColor = DEFAULT_COLOR;
		compareStyle.backgroundColor = DEFAULT_COLOR;
	};

	return <Array array={array} />;
});

export default Basic;
