import React from 'react';
import {InfoLink} from '../InfoLink/InfoLink';
import './Nav.css';

import * as Styled from './Nav.styled';

const Nav = ({
	currentAlgorithm,
	visualizeNextIteration,
	setPlayAlgorithm,
	reset,
	chooseAlgorithm,
	handleSpeed,
	handleSize,
	maxSize,
	isSorting,
	isSorted,
	arrSize,
}) => {
	return (
		<Styled.NavContainer>
			<Styled.NavHeader> Sorting Algorithm Visualizer </Styled.NavHeader>
			<Styled.NavButtonContainer>
				<Styled.ImageButton onClick={visualizeNextIteration} disabled={isSorted ? true : false}>
					Next
				</Styled.ImageButton>
				<Styled.ImageButton onClick={setPlayAlgorithm} disabled={isSorted ? true : false}>
					Play
				</Styled.ImageButton>
				<Styled.ImageButton type='button' value='reset/randomize' onClick={reset} disabled={isSorting ? true : false}>
					reset/randomize
				</Styled.ImageButton>
				<div>
					<Styled.SliderLabel style={{color: 'white'}}> Speed </Styled.SliderLabel>
					<Styled.Slider name='speed' type='range' min='1' max='5' defaultValue='3' onChange={handleSpeed} />
				</div>
				<div>
					<Styled.SliderLabel style={{color: 'white'}}> Array Size </Styled.SliderLabel>
					<Styled.Slider
						name='size'
						type='range'
						min='10'
						max={maxSize}
						value={arrSize}
						onChange={handleSize}
						disabled={isSorting ? true : false}
					/>
				</div>
				<div>
					<Styled.AlgoInput name='algorithms' onChange={chooseAlgorithm}>
						<Styled.AlgoOption value='bubbleSort'> Bubble Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='insertionSort'> Insertion Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='selectionSort'> Selection Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='mergeSort'> Merge Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='quickSort'> Quick Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='countingSort'> Counting Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='radixSort'> Radix Sort </Styled.AlgoOption>
					</Styled.AlgoInput>
				</div>
				<InfoLink algorithm={currentAlgorithm} />
			</Styled.NavButtonContainer>
		</Styled.NavContainer>
	);
};

export default Nav;
