import React, { Component } from 'react';
import styled from 'styled-components';
import getISODay from 'date-fns/get_iso_day';
import getDaysInMonth from 'date-fns/get_days_in_month';

import NameOfDayGridItem from './NameOfDayGridItem';
import SingleDayGridItem, { SingleDayGridItemStyles } from './SingleDayGridItem';

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
  cursor: initial;
  &:hover {
    background: darkgray;
  }
  @media(max-width: 1100px) {
    display: none;
  }
`;

class Calendar extends Component {

  getDaysSquares = () => {
    const firstDayOfMonth = new Date(this.props.year, this.props.month, 1);
    const ISODayfirstDayOfMonth = getISODay(firstDayOfMonth);
    const numberOfDaysInMonth = getDaysInMonth(firstDayOfMonth)
    const squares = [];
    for (let i = 0; i < 42; i++) {
      const isBlankDay = i < ISODayfirstDayOfMonth || i >= numberOfDaysInMonth + ISODayfirstDayOfMonth;
      const dayNumber = i - ISODayfirstDayOfMonth + 1;
      squares.push(isBlankDay
        ? <EmptyGridItemStyles key={i}></EmptyGridItemStyles>
        : <SingleDayGridItem key={i}
            onClickHandler={this.props.openModalHandler}
            dayNumber={dayNumber}
            onDeleteReminder={this.props.deleteReminderhandler}
            reminders={this.props.monthData[dayNumber] || []}
            ></SingleDayGridItem>
      )
    }
    return squares;
  }

  render () {
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
    )
  }
}

export default Calendar;