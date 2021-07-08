export const setArrayColorByRange = (
	start,
	end,
	rangeColor,
	outOfRangeColor
) => {
	let rects = document.getElementsByClassName('array-wrapper')[0].children;

	for (var i = 0; i < rects.length; i++) {
		if (isInRange(i, start, end)) {
			rects[i].style.backgroundColor = rangeColor;
		} else {
			rects[i].style.backgroundColor = outOfRangeColor;
		}
	}
};

export const setArrayColorByIndices = (indices, color) => {
	let rects = document.getElementsByClassName('array-wrapper')[0].children;
	console.log(indices);
	for (var i = 0; i < indices.length; i++) {
		rects[indices[i]].style.backgroundColor = color;
	}
};

export const resetAllColors = (color) => {
	let rects = document.getElementsByClassName('array-wrapper')[0].children;
	for (var i = 0; i < rects.length; i++) {
		rects[i].style.backgroundColor = color;
	}
};

const isInRange = (val, start, end) => {
	return val >= start && val <= end;
};
