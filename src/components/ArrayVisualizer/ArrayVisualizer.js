import React from 'react';
import Nav from '../Nav/Nav';
import {default as BasicVisualization} from './Visualizations/Basic';
import {default as MergeSortVisualization} from './Visualizations/MergeSort';
import {default as QuickSortVisualization} from './Visualizations/QuickSort';
import {default as CountingSortVisualization} from './Visualizations/CountingSort';
import {default as RadixSortVisualization} from './Visualizations/RadixSort';

import {bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, countingSort, radixSort, testSort} from '../../helper/algorithms';

import './ArrayVisualizer.css';

const DEFAULT_SIZE = 30;
const MIN_ARR_SIZE = 10;
const MAX_ARR_SIZE = 250;
const ITERATION_SPEEDS = [1000, 500, 100, 15, 3];
/*
convert to functional component and access child functions like this: https://stackoverflow.com/questions/37949981/call-child-method-from-parent
*/

class ArrayVisualizer extends React.Component {
	state = {
		currentAlgorithm: 'bubbleSort',
		array: [],
		visualizedSteps: [],
		vsIndex: 0,
		isSorting: false,
		arrSize: DEFAULT_SIZE,
		sortingSpeed: ITERATION_SPEEDS[2],
		ref: null,
		isSorted: false,
	};

	componentDidMount = () => {
		this.initializeArrays();
		let ref = React.createRef();
		this.setState({ref});
	};

	playAlgorithm = () => {
		const {isSorting, sortingSpeed} = this.state;
		if (isSorting) {
			//https://stackoverflow.com/a/37728255 for timeouts

			// var interval = setInterval(() => {
			// 	const {isSorting, vsIndex, visualizedSteps} = this.state;
			// 	this.visualizeNextIteration();
			// 	if (vsIndex === visualizedSteps.length || !isSorting) clearInterval(interval);
			// }, sortingSpeed);

			//this solution lets you adjust the sorting speed mid algorithm
			setTimeout(() => {
				this.visualizeNextIteration();
				const {isSorting, vsIndex, visualizedSteps} = this.state;
				if (vsIndex !== visualizedSteps.length && isSorting) this.playAlgorithm();
			}, sortingSpeed);
		}
	};

	visualizeNextIteration = () => {
		const {vsIndex, visualizedSteps, ref} = this.state;
		if (vsIndex < visualizedSteps.length) {
			let visual = ref.current;

			visual.updateColors(vsIndex, visualizedSteps);

			this.setState({vsIndex: vsIndex + 1}, () => {
				if (this.state.vsIndex === visualizedSteps.length) {
					visual.handleLastStep();
					this.setState({
						isSorting: false,
						isSorted: true,
					});
				}
			});
		}
	};

	initializeArrays = () => {
		const {currentAlgorithm, arrSize} = this.state;

		let array = [];
		let algo = currentAlgorithm;
		let minVal = algo === 'countingSort' ? 1 : 10;
		minVal = algo === 'radixSort' ? 20 : minVal;
		let maxVal = algo === 'countingSort' ? 9 : 500;

		for (let i = 0; i < arrSize; i++) {
			array[i] = this.getRandomValue(minVal, maxVal);
		}

		this.setState({array}, () => {
			this.getVisualizedSteps();
		});
	};

	changeArraySize = () => {
		const {array, currentAlgorithm, arrSize} = this.state;

		let arr = [...array];
		let size = parseInt(arrSize);

		let algo = currentAlgorithm;
		let minVal = algo === 'countingSort' ? 1 : 10;
		minVal = algo === 'radixSort' ? 20 : minVal;
		let maxVal = algo === 'countingSort' ? 9 : 500;

		if (arr.length < size) {
			//new array is bigger
			for (let i = arr.length; i < size; i++) {
				arr[i] = this.getRandomValue(minVal, maxVal);
			}
		} else {
			//new array is smaller
			let diff = arr.length - size;
			for (let i = 0; i < diff; i++) {
				arr.pop();
			}
		}

		this.setState({array: arr}, () => {
			this.getVisualizedSteps();
		});
	};

	reset = () => {
		this.setState(
			{
				vsIndex: 0,
				isSorting: false,
				isSorted: false,
			},
			() => {
				this.initializeArrays();
				this.state.ref.current.reset();
			}
		);
	};

	getVisualizedSteps = () => {
		const {array, currentAlgorithm} = this.state;

		let visualizedSteps = [];
		let tempArray = [...array];
		switch (currentAlgorithm) {
			case 'bubbleSort':
				visualizedSteps = bubbleSort(tempArray);
				break;
			case 'insertionSort':
				visualizedSteps = insertionSort(tempArray);
				break;
			case 'selectionSort':
				visualizedSteps = selectionSort(tempArray);
				break;
			case 'quickSort':
				visualizedSteps = quickSort(tempArray);
				break;
			case 'mergeSort':
				visualizedSteps = mergeSort(tempArray);
				break;
			case 'countingSort':
				visualizedSteps = countingSort(tempArray);
				break;
			case 'radixSort':
				visualizedSteps = radixSort(tempArray);
				break;
			default:
				console.log('this algorithm has not been implemented yet');
				return;
		}
		console.log(visualizedSteps);
		this.setState({visualizedSteps});
	};

	getRandomValue(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
	}

	render() {
		const {currentAlgorithm, array, visualizedSteps, vsIndex, isSorting, arrSize, sortingSpeed, ref, isSorted} = this.state;
		return (
			<>
				<Nav
					currentAlgorithm={currentAlgorithm}
					visualizeNextIteration={this.visualizeNextIteration}
					setPlayAlgorithm={() => this.setState({isSorting: !isSorting}, () => this.playAlgorithm())}
					reset={() => {
						this.reset();
					}}
					chooseAlgorithm={(e) => {
						const {value} = e.target;
						this.setState({currentAlgorithm: value}, () => this.reset());
						if (value === 'radixSort' || value === 'countingSort') this.setState({arrSize: 15});
					}}
					handleSize={(e) => {
						this.setState(
							{
								arrSize: e.target.value,
								vsIndex: 0,
							},
							() => {
								this.changeArraySize();
								ref.current.reset();
							}
						);
					}}
					handleSpeed={(e) => {
						this.setState({
							sortingSpeed: ITERATION_SPEEDS[e.target.value - 1],
						});
					}}
					maxSize={currentAlgorithm === 'radixSort' || currentAlgorithm === 'countingSort' ? 20 : MAX_ARR_SIZE}
					isSorting={isSorting}
					isSorted={isSorted}
					arrSize={arrSize}
				/>
				{visualizedSteps.length === 0 && <div> Loading... </div>}

				{(currentAlgorithm === 'bubbleSort' || currentAlgorithm === 'selectionSort' || currentAlgorithm === 'insertionSort') && (
					<BasicVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={visualizedSteps}
						ref={ref}
					/>
				)}
				{currentAlgorithm === 'mergeSort' && (
					<MergeSortVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={visualizedSteps}
						ref={ref}
					/>
				)}
				{currentAlgorithm === 'quickSort' && (
					<QuickSortVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={visualizedSteps}
						ref={ref}
					/>
				)}
				{currentAlgorithm === 'countingSort' && (
					<CountingSortVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={visualizedSteps}
						ref={ref}
					/>
				)}
				{currentAlgorithm === 'radixSort' && (
					<RadixSortVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={visualizedSteps}
						ref={ref}
					/>
				)}
			</>
		);
	}
}

export default ArrayVisualizer;
