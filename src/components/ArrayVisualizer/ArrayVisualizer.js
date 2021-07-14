import React from 'react';
import Nav from '../Nav/Nav';
import {default as BasicVisualization} from './Visualizations/Basic';
import {default as MergeSortVisualization} from './Visualizations/MergeSort';
import {default as QuickSortVisualization} from './Visualizations/QuickSort';

import {bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, countingSort} from '../../helper/algorithms';

import './ArrayVisualizer.css';
import CountingRadix from './Visualizations/CountingRadix';

const DEFAULT_SIZE = 30;
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
	};

	componentDidMount = () => {
		this.initializeArrays();
		let ref = React.createRef();
		this.setState({ref});
	};

	playAlgorithm = () => {
		if (this.state.isSorting) {
			const {visualizedSteps} = this.state;
			// https://stackoverflow.com/a/37728255 although, a timeout wouldn't work either so I used an interval instead

			var interval = setInterval(() => {
				this.visualizeNextIteration();
				if (this.state.vsIndex === visualizedSteps.length || !this.state.isSorting) clearInterval(interval);
			}, this.state.sortingSpeed);
		}
	};

	visualizeNextIteration = () => {
		let visual = this.state.ref.current;
		const vsIndex = this.state.vsIndex;
		const steps = this.state.visualizedSteps;

		visual.updateColors(vsIndex, steps);

		this.setState({vsIndex: vsIndex + 1}, () => {
			if (this.state.vsIndex === steps.length) this.setState({isSorting: false});
		});
	};

	initializeArrays = () => {
		let array = [];
		//let array =
		let algo = this.state.currentAlgorithm;
		console.log(algo);
		let minVal = algo === 'countingSort' ? 1 : 10;
		let maxVal = algo === 'countingSort' ? 9 : 500;

		for (var i = 0; i < this.state.arrSize; i++) {
			array[i] = this.getRandomValue(minVal, maxVal);
		}
		this.setState({array}, () => {
			this.getVisualizedSteps();
		});
	};

	reset = () => {
		this.setState(
			{
				vsIndex: 0,
				isSorting: false,
			},
			() => {
				this.initializeArrays();
				this.state.ref.current.reset();
			}
		);
	};

	getVisualizedSteps = () => {
		console.log(this.state.array);
		let visualizedSteps = [];
		let tempArray = [...this.state.array];
		switch (this.state.currentAlgorithm) {
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
				visualizedSteps = countingSort(tempArray, 9);
				break;
			default:
				console.log('this algorithm has not been implemented yet');
				return;
		}
		this.setState({visualizedSteps});
	};

	//
	getRandomValue(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
	}

	render() {
		const {array, currentAlgorithm, isSorting} = this.state;
		return (
			<>
				<Nav
					visualizeNextIteration={this.visualizeNextIteration}
					setPlayAlgorithm={() => this.setState({isSorting: !this.state.isSorting}, () => this.playAlgorithm())}
					reset={() => {
						this.reset();
					}}
					chooseAlgorithm={(e) =>
						this.setState({currentAlgorithm: e.target.value}, () =>
							//this.getVisualizedSteps()
							this.reset()
						)
					}
					handleSize={(e) => {
						this.setState({arrSize: e.target.value}, () => this.initializeArrays());
					}}
					handleSpeed={(e) => {
						this.setState({
							sortingSpeed: ITERATION_SPEEDS[e.target.value - 1],
						});
					}}
				/>
				{this.state.visualizedSteps.length === 0 && <div> Loading... </div>}

				{(currentAlgorithm === 'bubbleSort' || currentAlgorithm === 'selectionSort' || currentAlgorithm === 'insertionSort') && (
					<BasicVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={this.state.visualizedSteps}
						ref={this.state.ref}
					/>
				)}
				{currentAlgorithm === 'mergeSort' && (
					<MergeSortVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={this.state.visualizedSteps}
						ref={this.state.ref}
					/>
				)}
				{currentAlgorithm === 'quickSort' && (
					<QuickSortVisualization
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={this.state.visualizedSteps}
						ref={this.state.ref}
					/>
				)}
				{currentAlgorithm === 'countingSort' && (
					<CountingRadix
						array={array}
						isSorting={isSorting}
						updateArray={(array) => this.setState({array})}
						steps={this.state.visualizedSteps}
						ref={this.state.ref}
					/>
				)}
			</>
		);
	}
}

export default ArrayVisualizer;
