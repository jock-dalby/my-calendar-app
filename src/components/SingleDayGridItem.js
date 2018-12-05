import React, { Component } from 'react';
import styled from 'styled-components';

const SingleDayGridItemStyles = styled.div`
  flex-basis: 12%;
  height: 115px;
  border: 1px solid black;
  padding: 10px;
  background: white;

  @media(max-width: 1100px) {
    flex-basis: 100%;
  }
`;

class SingleDayGridItem extends Component {
  render() {
    return (
      <SingleDayGridItemStyles>{this.props.children}</SingleDayGridItemStyles>
    )
  }
}

export default SingleDayGridItem;
export { SingleDayGridItemStyles }