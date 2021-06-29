import React from 'react';
import './Nav.css';

const Nav = ({visualizeNextIteration, setPlayAlgorithm}) => {
	return (
		<div className='navbar'>
			<h1> Sorting Algorithm Visualizer </h1>
			<button onClick={visualizeNextIteration}> next </button>
			<button onClick={setPlayAlgorithm}> play </button>
			<select name='algorithms'>
				<option value='bubbleSort'> Bubble Sort </option>
				<option value='test'>n^2 comparison test</option>
			</select>
		</div>
	);
};

export default Nav;
