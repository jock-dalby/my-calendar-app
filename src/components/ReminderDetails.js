import React, { Component } from 'react';
import styled from 'styled-components';

const REMINDER_COLORS = [ 'red', 'orange', 'yellow', 'green', 'blue', 'pink']
const ReminderDetailsStyles = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;

  div.details-section {
    margin: 10px auto;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }

  input, select {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
    &.cancel-button {
      color: red;
    }
    &.submit-button {
      color: green;
    }
  }
`;

class ReminderDetails extends Component {
  state = {
    details: '',
    date: '',
    time: '00:00',
    color: 'red'
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCancelHandler = () => {
    this.resetStateToDefaults();
    this.props.closeModal();
  }
  
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetStateToDefaults();
  }

  resetStateToDefaults = () => {
    this.setState({
      details: '',
      date: '',
      time: '00:00',
      color: 'red'
    })
  }
  
  render () {
    return (
      <ReminderDetailsStyles>
        <form onSubmit={this.onSubmitHandler}>
          <div className="details-section">
            <label>Reminder details</label>
            <input type="text" name="details" value={this.state.details} onChange={this.onChangeHandler}/>
          </div>
          <div className="details-section">
            <label>Date</label>
            <input type="date" name="date" defaultValue={this.props.date} onChange={this.onChangeHandler}/>
          </div>
          <div className="details-section">
            <label>Time</label>
            <input type="time" name="time" value={this.state.time} onChange={this.onChangeHandler}/>
          </div>
          <div className="details-section">
            <label>Reminder colour</label>
            <select name="color" value={this.state.color} onChange={this.onChangeHandler}>
              {REMINDER_COLORS.map(colour => (
                <option key={colour} value={colour}>{colour}</option>
              ))}
            </select>
          </div>
          <button className="cancel-button" type="button" onClick={this.onCancelHandler}>CANCEL</button>
          <button className="submit-button" type="submit" onClick={this.onSubmitHandler}>SUBMIT</button>
        </form>
      </ReminderDetailsStyles>
    );
  }
}

export default ReminderDetails;