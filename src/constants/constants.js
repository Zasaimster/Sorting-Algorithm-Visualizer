const defaultColor = '#649fed';
const currentColor = '#578f5f';
const swapColor = '#d46868';
const outOfRange = '#e6f0ff';
const compareColor = '#636363';
const sortedColor = '#a18bad';

const basicDescription = {
	DEFAULT: {
		color: defaultColor,
		description: 'Default color',
	},
	CURRENT: {
		color: currentColor,
		description: 'Current element',
	},
	COMPARISON: {
		color: compareColor,
		description: 'Element that the current is being compared to',
	},
	SWAP: {
		color: swapColor,
		description: 'Current is being swapped with this element',
	},
};

const mergeDescription = {
	DEFAULT: {
		color: defaultColor,
		description: 'Default color',
	},
	OUT_OF_RANGE: {
		color: outOfRange,
		description: 'Elements not in current range',
	},
	SMALL: {
		color: currentColor,
		description: 'Smaller element, added to the subarray',
	},
	BIG: {
		color: compareColor,
		description: 'Larger element, not added to the subarray',
	},
	SORTED: {
		color: sortedColor,
		description: 'Elements added to subarray',
	},
};

const quickDescription = {
	DEFAULT: {
		color: defaultColor,
		description: 'Default color',
	},
	OUT_OF_RANGE: {
		color: outOfRange,
		description: 'Elements not in current range',
	},
	SWAP: {
		color: swapColor,
		description: 'Indicates two elements that are swapping',
	},
	LOW: {
		color: '#ebe48d',
		description: 'Points to the low index',
	},
	HIGH: {
		color: '#c48b51',
		description: 'Points to the high index',
	},
	COMPARED: {
		color: compareColor,
		description: 'Elements that have been looked at',
	},
	SORTED: {
		color: sortedColor,
		description: 'Sorted elements',
	},
	PIVOT: {
		color: '#96c47e',
		description: 'Element that serves as a "pivot" for each section',
	},
};

const countDescription = {
	DEFAULT: {
		color: defaultColor,
		description: 'Default color',
	},
	CURRENT: {
		color: currentColor,
		description: 'Current element',
	},
	COMPARE: {
		color: compareColor,
		description: 'Element that the current is being compared to',
	},
};

//keeping this separate from countColors in case I want to change something in the future
const radixDescription = {
	DEFAULT: {
		color: defaultColor,
		description: 'Default color',
	},
	CURRENT: {
		color: currentColor,
		description: 'Current element',
	},
	COMPARE: {
		color: compareColor,
		description: 'Element that the current is being compared to',
	},
	TEXT: {
		color: swapColor, //technically not the swap color, but I like the same red being used for swaps
		description: 'Digits place',
	},
};

const descriptions = {
	bubbleSort: basicDescription,
	insertionSort: basicDescription,
	selectionSort: basicDescription,
	mergeSort: mergeDescription,
	quickSort: quickDescription,
	countingSort: countDescription,
	radixSort: radixDescription,
};

export {basicDescription, mergeDescription, quickDescription, countDescription, radixDescription, descriptions};
