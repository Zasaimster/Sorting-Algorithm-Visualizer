import {useState} from 'react';

import {descriptions} from '../../constants/constants';
import * as Styled from './Legend.styled';

const getTableInfo = (algorithm) => {
	let description = descriptions[algorithm];

	let toRet = Object.values(description).map((entry, index) => {
		return (
			<Styled.Row key={index}>
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

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Styled.Card open={isOpen}>
			<Styled.Header>
				<span>
					<Styled.DownArrow onClick={handleClick} open={isOpen} />
					<div>Color Legend</div>
				</span>
			</Styled.Header>
			<Styled.Table open={isOpen}>
				<tbody>{getTableInfo(algorithm)}</tbody>
			</Styled.Table>
		</Styled.Card>
	);
};
