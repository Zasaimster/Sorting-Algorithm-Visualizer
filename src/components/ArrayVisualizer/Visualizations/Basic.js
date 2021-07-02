import ArrayBar from './ArrayBar';

const visualizeNextIteration = () => {};

const updateColors = () => {};

const Basic = ({array, isSorting, playAlgorithm}) => {
	if (isSorting) {
	}

	return (
		<>
			{array.map((val, index) => (
				<ArrayBar key={index} val={val}>
					{val}
				</ArrayBar>
			))}
		</>
	);
};

export default Basic;
