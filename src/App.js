import React, { Component } from 'react';
import uuid from 'uuid';
import styled from 'styled-components';

import NameOfDayGridItem from './components/NameOfDayGridItem';
import ReminderDetails from './components/ReminderDetails';
import SingleDayGridItem, { SingleDayGridItemStyles } from './components/SingleDayGridItem';
import Aux from './hoc/Aux';
import Modal from './components/Modal';

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
    showModal: false,
    currentReminderDate: '',
    monthData: {
      firstDayOfMonth: 'SAT',
      numberOfDaysInMonth: 31,
      reminders: []
    }
  }

  openModalHandler = e => {
    this.setState({
      currentReminderDate: `2018-12-${e}`,
      showModal: true
    })
  }
  
  getDaysSquares = () => {
    const indexOfFirstDayOfMonth = DAY_LABELS.findIndex(day => day === this.state.monthData.firstDayOfMonth);
    const squares = [];
    for (let i = 0; i < 42; i++) {
      const isBlankDay = i < indexOfFirstDayOfMonth || i >= this.state.monthData.numberOfDaysInMonth + indexOfFirstDayOfMonth;
      const dayNumber = i - indexOfFirstDayOfMonth + 1;
      const dayNumberWithLeadingZero = String(dayNumber).length > 1 ? dayNumber : `0${dayNumber}`
      squares.push(isBlankDay
        ? <EmptyGridItemStyles key={i}></EmptyGridItemStyles>
        : <SingleDayGridItem key={i}
            onClickHandler={this.openModalHandler}
            dayNumber={dayNumberWithLeadingZero}
            onDeleteReminder={this.deleteReminderhandler}
            reminders={this.state.monthData.reminders.filter(reminder => reminder.date === `2018-12-${dayNumberWithLeadingZero}`)}
            ></SingleDayGridItem>
      )
    }
    return squares;
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  addReminderToDay = reminderDetails => {
    this.setState({
      monthData: {
        ...this.state.monthData,
        reminders: [
          ...this.state.monthData.reminders,
          {
            ...reminderDetails,
            date: reminderDetails.date || this.state.currentReminderDate,
            id: uuid()
          }
        ]
      }
    })
    this.closeModal();
  }

  deleteReminderhandler = id => {
    const allReminders = this.state.monthData.reminders;
    const filteredReminders = allReminders.filter(reminder => reminder.id !== id);
    this.setState({
      monthData: {
        ...this.state.monthData,
        reminders: filteredReminders
      }
    })
  }
  
  render() {
    const daysSquares = this.getDaysSquares();
    return (
      <Aux>
        <Modal show={this.state.showModal}>
          <ReminderDetails date={this.state.currentReminderDate}
            closeModal={this.closeModal}
            onSubmit={this.addReminderToDay}
          />
        </Modal>
        <PageContainerStyles>
          <GridRowStyles>
            {DAY_LABELS.map(day => <NameOfDayGridItem key={day}>{day}</NameOfDayGridItem>)}
          </GridRowStyles>
          <GridRowStyles>
            {daysSquares}
          </GridRowStyles>
        </PageContainerStyles>
      </Aux>
    );
  }
}

export default App;
