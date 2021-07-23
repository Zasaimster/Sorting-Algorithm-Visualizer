import React, {useState} from 'react';
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
	const [speed, setSpeed] = useState(3);
	const [size, setSize] = useState(30);

	const handleSizeChange = (e) => {
		const {value} = e.target;
		handleSize(value);
		setSize(value);

		//let width = document.getElementById('size-range').offsetWidth;
		document.getElementById('current-size-value').classList.add('active');
		let sizeDiff = maxSize - 10;
		document.getElementById('current-size-value').style.left = `${((value - 10) * 100) / sizeDiff}%`;
	};

	const handleSpeedChange = (e) => {
		const {value} = e.target;
		handleSpeed(value);
		setSpeed(value);

		document.getElementById('current-speed-value').classList.add('active');
		document.getElementById('current-speed-value').style.left = `${(value - 1) * 25}%`;
	};

	return (
		<Styled.NavContainer>
			<Styled.NavHeader> Sorting Algorithm Visualizer </Styled.NavHeader>
			<Styled.NavButtonContainer>
				<Styled.Button onClick={!isSorted ? visualizeNextIteration : undefined} disabled={isSorted}>
					Next
				</Styled.Button>
				<Styled.Button onClick={!isSorted ? setPlayAlgorithm : undefined} disabled={isSorted}>
					Play
				</Styled.Button>
				<Styled.Button type='button' value='reset/randomize' onClick={!isSorting ? reset : undefined} disabled={isSorting}>
					reset/randomize
				</Styled.Button>
				<div>
					<Styled.SliderWrapper>
						<Styled.SliderLabel> Speed </Styled.SliderLabel>
						<br />
						<Styled.Slider
							name='speed'
							type='range'
							id='speed-range'
							min='1'
							max='5'
							defaultValue='3'
							onChange={(e) => handleSpeedChange(e)}
							onMouseUp={() => document.getElementById('current-speed-value').classList.remove('active')}
						/>
						<Styled.RangeValues>
							<div> 1 </div>
							<div> 5 </div>
						</Styled.RangeValues>
						<Styled.SliderValue>
							<span id='current-speed-value'> {speed} </span>
						</Styled.SliderValue>
					</Styled.SliderWrapper>
				</div>
				<div>
					<Styled.SliderWrapper>
						<Styled.SliderLabel> Array Size </Styled.SliderLabel>
						<br />
						<Styled.Slider
							name='size'
							type='range'
							id='size-range'
							min='10'
							max={maxSize}
							value={arrSize}
							disabled={isSorting ? true : false}
							onChange={(e) => handleSizeChange(e)}
							onMouseUp={() => document.getElementById('current-size-value').classList.remove('active')}
						/>
						<Styled.RangeValues>
							<div> 10 </div>
							<div> {maxSize} </div>
						</Styled.RangeValues>
						<Styled.SliderValue>
							<span id='current-size-value'> {size} </span>
						</Styled.SliderValue>
					</Styled.SliderWrapper>
				</div>
				<Styled.AlgoSelectWrapper>
					<select name='algorithms' onChange={chooseAlgorithm}>
						<Styled.AlgoOption value='bubbleSort'> Bubble Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='insertionSort'> Insertion Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='selectionSort'> Selection Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='mergeSort'> Merge Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='quickSort'> Quick Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='countingSort'> Counting Sort </Styled.AlgoOption>
						<Styled.AlgoOption value='radixSort'> Radix Sort </Styled.AlgoOption>
					</select>
					<Styled.SelectArrow></Styled.SelectArrow>
				</Styled.AlgoSelectWrapper>
				<InfoLink algorithm={currentAlgorithm} />
			</Styled.NavButtonContainer>
		</Styled.NavContainer>
	);
};

export default Nav;
