import React, { Component } from 'react';
import styled from 'styled-components';

import NameOfDayGridItem from './components/NameOfDayGridItem';
import SingleDayGridItem, { SingleDayGridItemStyles } from './components/SingleDayGridItem';

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const PageContainerStyles = styled.div`
  width: 90%;
  margin: 20px auto;
`;

const GridRowStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const EmptyGridItemStyles = styled(SingleDayGridItemStyles)`
  background: darkgray;
  @media(max-width: 1100px) {
    display: none;
  }
`;

class App extends Component {
  state = {
    monthData: {
      firstDayOfMonth: 'SAT',
      numberOfDaysInMonth: 31,
      reminders: []
    }
  }
  
  getDaysSquares = () => {
    const indexOfFirstDayOfMonth = DAY_LABELS.findIndex(day => day === this.state.monthData.firstDayOfMonth);
    const squares = [];
    for (let i = 0; i < 42; i++) {
      const isBlankDay = i < indexOfFirstDayOfMonth || i >= this.state.monthData.numberOfDaysInMonth + indexOfFirstDayOfMonth;
      squares.push(isBlankDay
        ? <EmptyGridItemStyles key={i}></EmptyGridItemStyles>
        : <SingleDayGridItem key={i}>{i - indexOfFirstDayOfMonth + 1}</SingleDayGridItem>
      )
    }
    return squares;
  }
  
  render() {
    const daysSquares = this.getDaysSquares();
    return (
      <PageContainerStyles>
        <GridRowStyles>
          {DAY_LABELS.map(day => <NameOfDayGridItem key={day}>{day}</NameOfDayGridItem>)}
        </GridRowStyles>
        <GridRowStyles>
          {daysSquares}
        </GridRowStyles>
      </PageContainerStyles>
    );
  }
}

export default App;
