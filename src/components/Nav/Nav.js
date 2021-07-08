import React from 'react';
import './Nav.css';

const Nav = ({
	visualizeNextIteration,
	setPlayAlgorithm,
	chooseAlgorithm,
	handleSpeed,
	handleSize,
}) => {
	return (
		<div className='navbar'>
			<h1> Sorting Algorithm Visualizer </h1>
			<button onClick={visualizeNextIteration}> next </button>
			<button onClick={setPlayAlgorithm}> play </button>
			<label> Sorting Speed </label>
			<input
				name='speed'
				type='range'
				min='1'
				max='5'
				defaultValue='3'
				onChange={handleSpeed}
			/>
			<label> Array Size </label>
			<input
				name='size'
				type='range'
				min='10'
				max='250'
				defaultValue='30'
				onChange={handleSize}
			/>
			<select name='algorithms' onChange={chooseAlgorithm}>
				<option value='bubbleSort'> Bubble Sort </option>
				<option value='insertionSort'> Insertion Sort </option>
				<option value='selectionSort'> Selection Sort </option>
				<option value='mergeSort'> Merge Sort </option>
				<option value='quickSort'> Quick Sort todo </option>
				<option value='countingSort'> Counting Sort** todo </option>
				<option value='radixSort'> Radix Sort** todo </option>
			</select>
		</div>
	);
};

export default Nav;
