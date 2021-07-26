import {useState} from 'react';

import {descriptions} from '../../constants/constants';
import * as Styled from './Legend.styled';

const getTableInfo = (algorithm) => {
	let description = descriptions[algorithm];
	console.log(description);

	let toRet = Object.values(description).map((entry) => {
		console.log(entry);

		return (
			<Styled.Row>
				<td>
					<Styled.ColorEntry fill={entry.color} />
				</td>
				<td>
					<Styled.DescriptionEntry>{entry.description} </Styled.DescriptionEntry>
				</td>
			</Styled.Row>
		);
	});

	return toRet;
};

export const Legend = ({algorithm}) => {
	const [isOpen, setIsOpen] = useState(true);
	console.log(isOpen);

	return (
		<Styled.Card>
			<Styled.Header>
				<span> ^ </span>
			</Styled.Header>
			<Styled.Table>{getTableInfo(algorithm)}</Styled.Table>
		</Styled.Card>
	);
};
