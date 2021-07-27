import styled from 'styled-components';
import question from '../../img/question32.png';

const links = {
	bubbleSort: 'https://en.wikipedia.org/wiki/Bubble_sort',
	selectionSort: 'https://www.interviewcake.com/concept/javascript/selection-sort',
	insertionSort: 'https://www.interviewcake.com/concept/javascript/insertion-sort',
	mergeSort: 'https://www.interviewcake.com/concept/javascript/merge-sort?',
	quickSort: 'https://www.interviewcake.com/concept/javascript/quicksort?',
	countingSort: 'https://www.interviewcake.com/concept/javascript/counting-sort',
	radixSort: 'https://www.interviewcake.com/concept/javascript/radix-sort',
};

export const InfoLink = ({algorithm}) => {
	//replace with a question mark image
	return (
		<>
			<Wrapper>
				<a href={links[algorithm]} target='_blank' rel='noreferrer'>
					<img src={question} alt='?' />
				</a>
				<ToolTip>Learn more</ToolTip>
			</Wrapper>
		</>
	);
};

const ToolTip = styled.span`
	visibility: hidden;
	background-color: white;
	color: black;
	padding: 5px 3px 5px 3px;
	border-radius: 5px;
	font-family: 'Raleway';
	font-size: 0.75rem;

	position: absolute;
	z-index: 1;
	top: 8px;
	margin-left: 10px;

	opacity: 0;
	transition: opacity 30ms;

	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 25%;
		margin-left: -5px;

		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-right: 5px solid rgba(255, 255, 255, 1);
	}
`;

const Wrapper = styled.div`
	position: relative;
	margin-top: 5px;

	&:hover ${ToolTip} {
		visibility: visible;
		opacity: 0.8;
	}
`;
