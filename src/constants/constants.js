const defaultColor = '#006eff';
const currentColor = 'green';
const swapColor = 'red';
const outOfRange = '#a8cdff';
const compareColor = 'grey';
const sortedColor = 'purple';

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
		description: '',
	},
	LOW: {
		color: 'pink',
		description: '',
	},
	HIGH: {
		color: 'hotpink',
		description: '',
	},
	COMPARED: {
		color: compareColor,
		description: '',
	},
	SORTED: {
		color: sortedColor,
		description: '',
	},
	PIVOT: {
		color: 'yellow',
		description: '',
	},
};

const countDescription = {
	DEFAULT: {
		color: defaultColor,
		description: '',
	},
	CURRENT: {
		color: currentColor,
		description: '',
	},
	COMPARE: {
		color: compareColor,
		description: '',
	},
};

//keeping this separate from countColors in case I want to change something in the future
const radixDescription = {
	DEFAULT: {
		color: defaultColor,
		description: '',
	},
	CURRENT: {
		color: currentColor,
		description: '',
	},
	COMPARE: {
		color: compareColor,
		description: '',
	},
	TEXT: {
		color: 'red',
		description: '',
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
