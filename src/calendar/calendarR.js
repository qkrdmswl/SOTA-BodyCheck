import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import Container from "./dietTable";

class Calender extends React.Component {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });

  callDay = (clickedDay) => {
    this.props.setDate(clickedDay);
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