const swap = (arr, i, j) => {
	var temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
};

export const nSquaredComparisonTest = (arr) => {
	let iterations = [];
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			iterations.push([i, j, false]);
		}
	}

	return iterations;
};

export const bubbleSort = (arr) => {
	let iterations = [];

	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				swap(arr, j, j + 1);
				iterations.push([j, j + 1, true]);
			} else {
				iterations.push([j, j + 1, false]);
			}
		}
	}
	//console.log(arr);
	console.log(iterations);
	return iterations;
};

export const insertionSort = (arr) => {
	let iterations = [];

	for (var i = 1; i < arr.length; i++) {
		var valToInsert = arr[i];
		var index = i;

		while (index > 0) {
			if (arr[index - 1] > valToInsert) {
				swap(arr, index, index - 1);
				iterations.push([index, index - 1, true]);
				index--;
			} else {
				iterations.push([index, index - 1, false]);
				break;
			}
		}
		arr[index] = valToInsert;
	}
	//console.log(arr, iterations);
	console.log(iterations);

	return iterations;
};

export const selectionSort = (arr) => {
	let iterations = [];

	for (var i = 0; i < arr.length; i++) {
		var minIndex = i;
		console.log('?');

		for (var j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
				iterations.push([minIndex, j, false]);
				console.log('????');
			}
		}

		if (minIndex !== i) {
			swap(arr, i, minIndex);
			iterations.push([i, minIndex, true]);
		}
	}

	//console.log(arr, iterations);
	console.log(iterations);

	return iterations;
};

/*
steps[
	bool indicating whether it is adding values into the count arr
	index indicating which element is being looked at in arr
	index indicating which element this is for count
]
*/
export const countingSort = (arr, max) => {
	let iterations = [];
	let count = new Array(max + 1).fill(0);
	console.log(count);

	for (var i = 0; i < arr.length; i++) {
		count[arr[i]]++;
		iterations.push([true, i, arr[i]]);
	}

	for (i = 1; i < count.length; i++) {
		count[i] += count[i - 1];
	}
	console.log('here');
	console.log(count);
	let res = new Array(arr.length).fill(0);
	for (i = 0; i < arr.length; i++) {
		res[count[arr[i]] - 1] = arr[i];
		iterations.push([false, i, arr[i]]);
		count[arr[i]]--;
	}
	console.log('res', res, iterations);

	//console.log(arr, iterations);

	return iterations;
};

export const quickSort = (arr) => {
	let low = 0;
	let high = arr.length - 1;
	let iterations = [];
	let sorted = [];
	quickSortAlgo(arr, low, high, iterations, sorted);

	console.log(arr);
	console.log(iterations);

	return iterations;
};

export const mergeSort = (arr) => {
	let low = 0;
	let high = arr.length - 1;
	let iterations = [];

	mergeSortAlgo(arr, low, high, iterations);

	console.log(arr);
	console.log(iterations);

	return iterations;
};

const quickSortAlgo = (arr, low, high, iterations, sorted) => {
	if (low < high) {
		let partitionIndex = partition(arr, low, high, iterations, sorted);
		sorted.push(partitionIndex);

		quickSortAlgo(arr, partitionIndex + 1, high, iterations, sorted);
		quickSortAlgo(arr, low, partitionIndex - 1, iterations, sorted);
	} else {
		if (low < arr.length) sorted.push(low);
	}
};

/*
steps[
	index of pivot OR VALUE SWAPPED, 
	index of compared value OR VALUE SWAPPED
	0 = still looking for values to swap, -1 = a swap is occurring
	range to indicate current section
	array of indices to indicate which elements are already in sorted position
	array of indices to indicate which elements have already been looked at in the current iteration 
]
*/
const partition = (arr, low, high, iterations, sorted) => {
	var i = low;
	var j = high;
	let range = [low, high];

	//pivot from lowest point of current sub-array
	let pivot = arr[low];
	let lookedAt = [];

	while (i < j) {
		while (i < arr.length && arr[i] <= pivot) {
			iterations.push([
				low,
				[i, j],
				0,
				range,
				[...lookedAt],
				[...sorted],
			]);
			lookedAt.push(i);
			i++;
		}

		while (j > 0 && arr[j] > pivot) {
			iterations.push([
				low,
				[i, j],
				0,
				range,
				[...lookedAt],
				[...sorted],
			]);
			lookedAt.push(j);
			j--;
		}

		if (i < j) {
			swap(arr, i, j);
			iterations.push([
				low,
				[i, j],
				-1,
				range,
				[...lookedAt],
				[...sorted],
			]);
			//make diff case so both are red
		}
	}

	swap(arr, low, j);
	//? this case
	iterations.push([low, [low, j], -1, range, [...lookedAt], [...sorted]]);

	return j;
};

const mergeSortAlgo = (arr, low, high, iterations) => {
	if (low < high) {
		let mid = Math.floor((low + high) / 2);
		//console.log('range:', low + '-' + high);
		mergeSortAlgo(arr, low, mid, iterations);
		mergeSortAlgo(arr, mid + 1, high, iterations);
		sortAndMerge(arr, low, mid, high, iterations);
	}
};

const sortAndMerge = (arr, low, mid, high, iterations) => {
	let l1 = mid - low + 1;
	let l2 = high - mid;
	let left = [];
	let right = [];

	let range = [low, high];
	let lOffset = low;
	let rOffset = mid + 1;

	for (let i = 0; i < l1; i++) {
		//left[i] = arr[low + i];
		left.push(arr[lOffset + i]);
	}
	for (let i = 0; i < l2; i++) {
		//right[i] = arr[mid + 1 + i];
		right.push(arr[rOffset + i]);
	}

	let i = 0,
		j = 0,
		k = low;
	var sorted = [];

	while (i < l1 && j < l2) {
		if (left[i] <= right[j]) {
			//0th index is the smaller one
			iterations.push([lOffset + i, rOffset + j, range, [...sorted]]);
			sorted.push(lOffset + i);
			console.log(sorted);
			arr[k] = left[i];
			i++;
		} else {
			iterations.push([rOffset + j, lOffset + i, range, [...sorted]]);
			sorted.push(rOffset + j);
			arr[k] = right[j];
			j++;
		}
		k++;
	}

	while (i < l1) {
		arr[k] = left[i];
		iterations.push([lOffset + i, -1, range, [...sorted]]);
		sorted.push(lOffset + i);
		i++;
		k++;
	}
	while (j < l2) {
		arr[k] = right[j];
		iterations.push([rOffset + j, -1, range, [...sorted]]);
		sorted.push(rOffset + j);
		j++;
		k++;
	}
};
