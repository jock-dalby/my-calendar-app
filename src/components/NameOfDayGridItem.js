import React from 'react'
import styled from 'styled-components';
import { SingleDayGridItemStyles } from '../components/SingleDayGridItem';

const NameOfDayGridItemStyles = styled(SingleDayGridItemStyles)`
  height: 30px;
  text-align: center;
  padding-top: auto;
  @media(max-width: 1100px) {
    display: none;
  }
`;

const NameOfDayGridItem = props => (
  <NameOfDayGridItemStyles>{props.children}</NameOfDayGridItemStyles>
)

export default NameOfDayGridItem;