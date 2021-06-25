import React from 'react'
import ArrayBar from './ArrayBar';

import './ArrayVisualizer.css'

const DEFAULT_SIZE = 30;

class ArrayVisualizer extends React.Component {
	state = {
		array: [],
	};

    componentDidMount() {
        this.initializeArray();
    }

	initializeArray() {
		let array = [];
		for (var i = 0; i < DEFAULT_SIZE; i++) {
			array[i] = this.getRandomValue(1, 500);
		}
		this.setState({array});
	}

	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	getRandomValue(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	render() {
        const { array } = this.state; 

            return(
                <div className="array-wrapper">
                    {array.map((val, index) => 
                        <ArrayBar
                            key={index}
                            val={val}
                        >
                            {val}
                        </ArrayBar>
                    )}
                </div>
            );
        }
}

export default ArrayVisualizer;