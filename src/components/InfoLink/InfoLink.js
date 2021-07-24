import styled from 'styled-components';
import {radixSort} from '../../helper/algorithms';
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
		<Wrapper>
			<Link href={links[algorithm]} target='_blank' rel='noreferrer'>
				<img src={question} alt='?' />
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	width: 32px;
	height: 32px;
	margin-top: 10px;
`;

const Link = styled.a`
	position: absolute;
	bottom: 0;
`;
