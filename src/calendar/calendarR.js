import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

class Calender extends React.Component {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });

  callDay = (clickedDay) => {
    const date = `${clickedDay.getFullYear()}-${clickedDay.getMonth()+1}-${clickedDay.getDate()}`;
    this.props.onChange(date);
  }; //moment(day.dateString).format(_format)

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          onClickDay={this.callDay}
        />
      </div>
    );
  }
}

export default Calender;