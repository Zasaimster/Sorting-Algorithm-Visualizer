import styled from 'styled-components';

import {IoArrowDownCircleOutline} from 'react-icons/io5';

export const Card = styled.div`
	position: absolute;
	bottom: 22px;
	left: 32px;
	max-height: ${(props) => (props.open ? '500px' : '32px')};
	width: ${(props) => (props.open ? '400px' : '32px')};
	box-shadow: 0px 0px 4px black;
	border: 1px solid black;
	border-radius: 15px;
	padding: ${(props) => (props.open ? '5px 15px 15px 15px' : '0')};
	background-color: white;
	z-index: 10;

	overflow: hidden;

	transition: ${(props) =>
		props.open
			? 'max-height 300ms ease-in-out 250ms, width 200ms ease-in-out, padding 300ms ease-in'
			: 'width 200ms ease-in-out 250ms, max-height 300ms ease-in-out, padding 300ms ease-in'};
`;

export const Header = styled.div`
	font-family: 'Raleway';
	width: 100%;
	height: 32px;
	padding-bottom: 5px;

	& span {
		width: 100%;
		float: left;
	}

	& span div {
		font-size: 1.5em;
		text-align: center;
		padding-right: 32px;
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

export const DownArrow = styled(IoArrowDownCircleOutline)`
	float: left;
	font-size: 2em;

	transform: ${(props) => (props.open ? 'rotate(0deg)' : 'rotate(-180deg)')};
	transition: transform 300ms linear;

	&:hover {
		cursor: pointer;
	}
`;
