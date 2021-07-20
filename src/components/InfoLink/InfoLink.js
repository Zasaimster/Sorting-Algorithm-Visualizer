import {radixSort} from '../../helper/algorithms';

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
	console.log(links[algorithm]);
	//replace with a question mark image
	return (
		<a href={links[algorithm]} target='_blank' rel='noreferrer'>
			{' '}
			?{' '}
		</a>
	);
};
