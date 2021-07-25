const defaultColor = '#006eff';
const currentColor = 'green';
const swapColor = 'red';
const outOfRange = '#a8cdff';
const compareColor = 'grey';
const sortedColor = 'purple';

const basicDescription = {
	DEFAULT: {
		color: defaultColor,
		description: '',
	},
	CURRENT: {
		color: currentColor,
		description: '',
	},
	COMPARISON: {
		color: compareColor,
		description: '',
	},
	SWAP: {
		color: swapColor,
		description: '',
	},
};

const mergeDescription = {
	DEFAULT: {
		color: defaultColor,
		description: '',
	},
	OUT_OF_RANGE: {
		color: outOfRange,
		description: '',
	},
	SMALL: {
		color: currentColor,
		description: '',
	},
	BIG: {
		color: compareColor,
		description: '',
	},
	SORTED: {
		color: sortedColor,
		description: '',
	},
};

const quickDescription = {
	DEFAULT: {
		color: defaultColor,
		description: '',
	},
	OUT_OF_RANGE: {
		color: outOfRange,
		description: '',
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
	DEFAULT: defaultColor,
	CURRENT: currentColor,
	COMPARE: compareColor,
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
	countingSorting: countDescription,
	radixSort: radixDescription,
};

export {basicDescription, mergeDescription, quickDescription, countDescription, radixDescription, descriptions};
