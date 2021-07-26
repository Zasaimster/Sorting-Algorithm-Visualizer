import styled from 'styled-components';

export const Card = styled.div`
	position: absolute;
	bottom: 20px;
	left: 100px;
	width: 500px;
	box-shadow: 0px 0px 4px black;
	border: 1px solid black;
	border-radius: 15px;
	padding: 5px 15px 15px 15px;
	background-color: white;
	z-index: 10;
`;

export const Header = styled.div`
	margin-left: 2px;

	& span {
	}
`;

export const Table = styled.table``;

export const Row = styled.tr`
	padding: 0;
	& td:nth-child(2) {
		padding-left: 10px;
	}
`;

export const ColorEntry = styled.div`
	width: 15px;
	height: 15px;
	background-color: ${(props) => props.fill};
`;

export const DescriptionEntry = styled.span`
	font-family: 'Raleway';
`;
