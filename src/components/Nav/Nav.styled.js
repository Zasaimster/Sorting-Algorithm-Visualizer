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
	position: relative;
	padding: 0 0 0 20px;

	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(7, minmax(0, 1fr));

	text-align: center;

	@media (max-width: 900px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
`;

export const Button = styled.p`
	border: none;
	background: none;
	color: white;
	margin-top: 20px;
	height: 20px;
	text-align: center;

	text-transform: uppercase;
	font-family: Sans-Serif;
	font-weight: 400;

	&:hover {
		font-weight: 600;
	}
`;

//https://www.youtube.com/watch?v=px9Ch15jo-E
export const SliderLabel = styled.label`
	color: white;
`;

export const Slider = styled.input`
	-webkit-appearance: none;
	width: 150px;
	height: 2px;
	background: ${(props) => (props.disabled ? 'gray' : '#f5f5f5')};
	border-radius: 2px;
	outline: none;
	border: none;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 8px;
		height: 20px;
		background: ${(props) => (props.disabled ? 'gray' : '#f5f5f5')};
		border-radius: 20px;
		cursor: pointer;
	}

	@media (max-width: 1400px) {
		width: 100%;
	}
`;

export const SliderWrapper = styled.div`
	//center
	height: 80px;
	font-family: 'Raleway';
	text-align: center;
	width: 150px;

	@media (max-width: 1400px) {
		width: 100%;
	}
`;

export const SliderValue = styled.div`
	//show value
	position: relative;
	height: 30px;

	& span {
		position: absolute;
		width: 25px;
		height: 25px;
		line-height: 25px;
		background: #f5f5f5;
		text-align: center;
		color: #111;
		border-radius: 50%;
		font-size: 12px;
		left: 50%;
		transform: translateX(-50%) scale(0);
		transform-origin: bottom;
		transition: transform 50ms ease-in-out;
	}

	& span.active {
		transform: translateX(-50%) scale(1);
	}
`;

export const RangeValues = styled.div`
	//range

	margin-top: 10px;
	position: relative;

	text-align: center;

	& div {
		position: absolute;
		color: #ddd;
		font-weight: 600;
	}

	& div:nth-child(2) {
		right: 0px;
	}
`;

export const AlgoInput = styled.select``;

export const AlgoOption = styled.option``;
