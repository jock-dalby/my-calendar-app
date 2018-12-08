import React, { Component } from 'react';
import uuid from 'uuid';

import Calendar from './components/Calendar';
import ReminderDetails from './components/ReminderDetails';

import Aux from './hoc/Aux';
import Modal from './components/Modal';


class App extends Component {
  state = {
    showModal: true,
    year: 2018,
    month: 11,
    day: null,
    reminders: {}
  }

  openModalHandler = day => {
    this.setState({
      day,
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      day: null,
      showModal: false
    })
  }

  getRemindersForYear = () => {
    return this.state.reminders[this.state.year] || {};
  }

  getRemindersForMonth = () => {
    return this.getRemindersForYear()[this.state.month] || {};
  }

  getRemindersForDay = day => {
    return this.getRemindersForMonth()[day || this.state.day] || [];
  }

  addReminderToDay = reminderDetails => {
    const updatedReminders = {
      [this.state.year]: {
        ...this.getRemindersForYear(),
        [this.state.month]: {
          ...this.getRemindersForMonth(),
          [this.state.day]: [
            ...this.getRemindersForDay(),
            {
              ...reminderDetails,
              date: reminderDetails.date,
              id: uuid()
            }
          ]
        }
      }
    }
    this.setState({ reminders: updatedReminders })
    this.closeModal();
  }

  deleteReminderhandler = (day, id) => {
    const filteredRemindersForDay = this.getRemindersForDay(day).filter(reminder => reminder.id !== id);
    const updatedReminders = {
      [this.state.year]: {
        ...this.getRemindersForYear(),
        [this.state.month]: {
          ...this.getRemindersForMonth(),
          [day]: [
            ...filteredRemindersForDay
          ]
        }
      }
    }
    this.setState({ reminders: updatedReminders })
  }
  
  render() {
    const reminderDateString = this.state.day && `${this.state.year}-${this.state.month + 1}-${this.state.day}`;
    return (
      <Aux>
        <Modal show={reminderDateString && this.state.showModal}>
          <ReminderDetails date={reminderDateString}
            closeModal={this.closeModal}
            onSubmit={this.addReminderToDay}
          />
        </Modal>
        <Calendar year={this.state.year}
          month={this.state.month}
          monthData={this.getRemindersForMonth()}
          openModalHandler={this.openModalHandler}
          deleteReminderhandler={this.deleteReminderhandler}
          />
      </Aux>
    );
  }
}

export default App;
