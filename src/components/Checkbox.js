import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";

import check from "../icons/check.svg";

const Container = styled.label`
	display: block;
	position: relative;
	cursor: pointer;
		
	padding-left: 35px;	
	
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	
	input:checked ~ .checkmark {
		/* Blue background and white check mark */ 
		background-color: ${ colors.$color_pink_dark };
		background-image: url( ${ check } );
		background-repeat: no-repeat;
		background-position: center;
		background-size: 75%;
	}
`;

const CheckboxInput = styled.input`
	position: absolute;
	opacity: 0;
	cursor: pointer;
`;

const Checkmark = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	
	:hover {
		background-color: #ccc;
	};
	
	box-shadow: inset 0 1px 8px 0 rgba(0,0,0,0.3);
	background: ${ colors.$color_white };
	
`;

/**
 * Custom Yoast-styled checkbox input component.
 * (Since default checkbox element cannot be easily styled with CSS).
 */
class Checkbox extends React.Component {
	render() {
		return <Container> { this.props.children }
			<CheckboxInput type={ "checkbox" } />
			<Checkmark className={ "checkmark" } />
		</Container>;
	}
}

Checkbox.propTypes = {
	children: PropTypes.any,
	onCheck: PropTypes.func,
};

Checkbox.defaultProps = {
	children: [],
};

export default Checkbox;
