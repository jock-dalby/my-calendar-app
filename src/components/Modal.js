import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Backdrop from './Backdrop';
import styled from 'styled-components';

const ModalStyles = styled.div`
  position: fixed;
  z-index: 500;
  background-color: lightblue;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  opacity: ${({ show }) => show ? '1' : '0'};
  transform: ${({ show }) => show ? 'translateY(0)' : 'translateY(-500vh)'};
  @media (min-width: 600px) {
    width: 500px;
    left: calc(50% - 250px);
  }
`;

class Modal extends Component {

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} onClicked={this.props.onClicked}/>
        <ModalStyles show={this.props.show}>{this.props.children}</ModalStyles>
      </Aux>
    )
  }
}

export default Modal;