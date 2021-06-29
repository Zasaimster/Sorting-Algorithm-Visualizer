import React from 'react';
import ArrayBar from './ArrayBar';
import Nav from '../Nav/Nav';

import {
	nSquaredComparisonTest,
	bubbleSort,
	insertionSort,
	selectionSort,
	quickSort,
	mergeSort,
} from '../../algorithms/algorithms';

import './ArrayVisualizer.css';

const DEFAULT_SIZE = 30;
const ITERATION_SPEED = 500;

const DEFAULT_COLOR = '#006eff';
const CURRENT_INDEX_COLOR = 'green';
const CURRENT_COMPARISON_COLOR = 'grey';
const SWAP_COLOR = 'red';

class ArrayVisualizer extends React.Component {
	state = {
		currentAlgorithm: 'mergeSort',
		array: [],
		visualizedSteps: [],
		vsIndex: 0,
		playAlgorithm: false,
	};

	componentDidMount = () => {
		this.initializeArrays();
	};

	playAlgorithm = () => {
		if (this.state.playAlgorithm) {
			const {visualizedSteps, vsIndex} = this.state;
			if (vsIndex === 0) {
				this.visualizeNextIteration();
			}

			/*
			https://stackoverflow.com/a/37728255
			//although, this method wouldn't work either so I used an interval instead
			while (this.state.vsIndex < visualizedSteps.length) {
			console.log('?');
			setTimeout(() => {
				this.visualizeNextIteration();
				console.log('bruh');
			}, 100 * this.state.vsIndex);
			}
			*/

			var interval = setInterval(() => {
				this.visualizeNextIteration();
				if (
					this.state.vsIndex === visualizedSteps.length ||
					!this.state.playAlgorithm
				)
					clearInterval(interval);
			}, ITERATION_SPEED);
		}
	};

	visualizeNextIteration = () => {
		const vsIndex = this.state.vsIndex;
		if (vsIndex !== 0) {
			this.resetPreviousColors();
		}
		this.updateCurrentColors();

		this.setState({vsIndex: vsIndex + 1}, () => {
			if (this.state.vsIndex === this.state.visualizedSteps.length) {
				this.resetPreviousColors();
				this.setState({playAlgorithm: false});
			}
		});
	};

	updateCurrentColors = () => {
		const vsIndex = this.state.vsIndex;
		let allSVGs =
			document.getElementsByClassName('array-wrapper')[0].children;

		const [currBar, compareBar, isSwapped] =
			this.state.visualizedSteps[vsIndex];
		const currBarStyle = allSVGs[currBar].children[0].style;
		const compareBarStyle = allSVGs[compareBar].children[0].style;

		currBarStyle.fill = CURRENT_INDEX_COLOR;
		if (!isSwapped) {
			compareBarStyle.fill = CURRENT_COMPARISON_COLOR;
		} else {
			compareBarStyle.fill = SWAP_COLOR;

			if (this.state.playAlgorithm) {
				let array = [...this.state.array];
				const temp = array[compareBar];
				array[compareBar] = array[currBar];
				array[currBar] = temp;

				this.setState({array});
			} else {
				//wait half a second to swap array elements if a user is going iteration by iteration
				setTimeout(() => {
					let array = [...this.state.array];
					const temp = array[compareBar];
					array[compareBar] = array[currBar];
					array[currBar] = temp;

					this.setState({array});
				}, 500);
			}
		}
	};

	resetPreviousColors = () => {
		const vsIndex = this.state.vsIndex;
		let allBars =
			document.getElementsByClassName('array-wrapper')[0].children;
		const [currBar, compareBar] = this.state.visualizedSteps[vsIndex - 1];
		const currBarStyle = allBars[currBar].children[0].style;
		const compareBarStyle = allBars[compareBar].children[0].style;

		currBarStyle.fill = DEFAULT_COLOR;
		compareBarStyle.fill = DEFAULT_COLOR;
	};

	initializeArrays = () => {
		let array = [];
		for (var i = 0; i < DEFAULT_SIZE; i++) {
			array[i] = this.getRandomValue(10, 500);
		}
		this.setState({array}, () => this.getVisualizedSteps());
	};

	getVisualizedSteps = () => {
		let visualizedSteps = [];
		let tempArray = [...this.state.array];
		switch (this.state.currentAlgorithm) {
			case 'test':
				visualizedSteps = nSquaredComparisonTest(tempArray);
				break;
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
			default:
				console.log('this algorithm has not been implemented yet');
				return;
		}
		this.setState({visualizedSteps}, () =>
			console.log('initialized visualizedSteps array')
		);
	};

	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	getRandomValue(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	render() {
		const {array} = this.state;
		return (
			<>
				<Nav
					visualizeNextIteration={this.visualizeNextIteration}
					setPlayAlgorithm={() =>
						this.setState(
							{playAlgorithm: !this.state.playAlgorithm},
							() => this.playAlgorithm()
						)
					}
					chooseAlgorithm={(e) =>
						this.setState({currentAlgorithm: e.target.value}, () =>
							this.getVisualizedSteps()
						)
					}
				/>
				<div className='array-wrapper'>
					{array.map((val, index) => (
						<ArrayBar key={index} val={val}>
							{val}
						</ArrayBar>
					))}
				</div>
			</>
		);
	}
}

export default ArrayVisualizer;
