const defaultColor = '#006eff';
const currentColor = 'green';
const swapColor = 'red';
const outOfRange = '#a8cdff';
const compareColor = 'grey';
const sortedColor = 'purple';

const basicColors = {
	DEFAULT: defaultColor,
	CURRENT: currentColor,
	COMPARISON: compareColor,
	SWAP: swapColor,
};

const mergeColors = {
	DEFAULT: defaultColor,
	OUT_OF_RANGE: outOfRange,
	SMALL: currentColor,
	BIG: compareColor,
	SORTED: sortedColor,
};

const quickColors = {
	DEFAULT: defaultColor,
	OUT_OF_RANGE: outOfRange,
	SWAP: swapColor,
	LOW: 'pink',
	HIGH: 'hotPink',
	COMPARED: compareColor,
	SORTED: sortedColor,
	PIVOT: 'yellow',
};

const countColors = {
	DEFAULT: defaultColor,
	CURRENT: currentColor,
	COMPARE: compareColor,
};

//keeping this separate from countColors in case I want to change something in the future
const radixColors = {
	DEFAULT: defaultColor,
	CURRENT: currentColor,
	COMPARE: compareColor,
	TEXT: 'red',
};

export {basicColors, mergeColors, quickColors, countColors, radixColors};
