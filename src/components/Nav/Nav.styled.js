import {enumDeclaration} from '@babel/types';
import styled from 'styled-components';

export const NavContainer = styled.div`
	position: relative;
	width: 100%;
	height: 125px;
	background-color: #1a1a1b;
`;

export const NavHeader = styled.h2`
	position: relative;
	font-family: 'Helvetica Neue', sans-serif;
	color: white;
	padding: 20px 0 0 20px;
`;

export const NavButtonContainer = styled.div`
	padding: 20px 0 0 20px;

	display: grid;
	gap: 0.5rem;
	grid-template-columns: repeat(7, minmax(0, 1fr));

	text-align: center;

	@media (max-width: 900px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
`;

export const ImageButton = styled.p`
	border: none;
	background: none;
	color: white;

	text-transform: uppercase;
	font-family: Sans-Serif;
	font-weight: 400;

	&:hover {
		font-weight: 600;
	}
`;

export const SliderLabel = styled.label``;

export const Slider = styled.input``;

export const AlgoInput = styled.select``;

export const AlgoOption = styled.option``;
