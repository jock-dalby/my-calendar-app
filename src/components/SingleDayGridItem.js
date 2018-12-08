import React, { Component } from 'react';
import styled from 'styled-components';

const SingleDayGridItemStyles = styled.div`
  flex-basis: 12%;
  height: 115px;
  border: 1px solid black;
  padding: 10px;
  background: white;
  overflow-y: overlay;
  cursor: pointer;
  &:hover {
    background: lightgray;
  }

  @media(max-width: 1100px) {
    flex-basis: 100%;
  }
`;

const SingleReminderStyles = styled.div`
  background-color: ${props => props.reminderColor};
  color: darkgray;
  padding: 5px;
  border-radius: 5px;
  margin: 5px auto;

  span.close-icon {
    float:right;
    padding: 0 5px 5px;
  }
  p {
    margin: 0;
  }
`;

class SingleDayGridItem extends Component {

  onClickHandler = () => {
    this.props.onClickHandler(this.props.dayNumber)
  }

  deleteReminderHandler = (e, day, id) => {
    e.stopPropagation();
    this.props.onDeleteReminder(day, id)
  }

  render() {
    const { dayNumber } = this.props;
    const dayNumberWithLeadingZero = String(dayNumber).length > 1 ? dayNumber : `0${dayNumber}`
    return (
      <SingleDayGridItemStyles onClick={this.onClickHandler}>
        {dayNumberWithLeadingZero}
        {this.props.reminders
          .sort((a, b) => convertTimeStringToNumber(a.time) - convertTimeStringToNumber(b.time))
          .map(reminder => (
        <SingleReminderStyles key={reminder.id} reminderColor={reminder.color}>
          <div>
            <span>{reminder.details}</span>
            <span className="close-icon" onClick={(e) => this.deleteReminderHandler(e, dayNumberWithLeadingZero, reminder.id)}>x</span>
          </div>
          <p className="reminder-time">{reminder.time}</p>
        </SingleReminderStyles>))}
      </SingleDayGridItemStyles>
    )
  }
}

function convertTimeStringToNumber(timeString) {
  const timeStringWithoutColon = timeString.replace(/:/g,'');
  return +timeStringWithoutColon
}

export default SingleDayGridItem;
export { SingleDayGridItemStyles }