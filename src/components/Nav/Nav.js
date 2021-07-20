import React from 'react';
import './Nav.css';

const Nav = ({visualizeNextIteration, setPlayAlgorithm, reset, chooseAlgorithm, handleSpeed, handleSize, maxSize, isSorted}) => {
	return (
		<div className='navbar'>
			<h1> Sorting Algorithm Visualizer </h1>
			<button onClick={visualizeNextIteration} disabled={isSorted ? true : false}>
				next
			</button>
			<button onClick={setPlayAlgorithm} disabled={isSorted ? true : false}>
				play
			</button>
			<button onClick={reset}> reset </button>
			<label> Sorting Speed </label>
			<input name='speed' type='range' min='1' max='5' defaultValue='3' onChange={handleSpeed} />
			<label> Array Size </label>
			<input name='size' type='range' min='10' max={maxSize} defaultValue='30' onChange={handleSize} />
			<select name='algorithms' onChange={chooseAlgorithm}>
				<option value='bubbleSort'> Bubble Sort </option>
				<option value='insertionSort'> Insertion Sort </option>
				<option value='selectionSort'> Selection Sort </option>
				<option value='mergeSort'> Merge Sort </option>
				<option value='quickSort'> Quick Sort </option>
				<option value='countingSort'> Counting Sort </option>
				<option value='radixSort'> Radix Sort** todo </option>
			</select>
		</div>
	);
};

export default Nav;
