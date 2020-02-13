import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./UserStoryCalendar.css";

export class UserStoryCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };

  }

  onChange = (date) => {
    this.setState({ date });
    console.log(date);
  };

  onClickMonth = (value, event) => {
    console.log(value, event)
  };

  render() {

    return (
      <div>
        <Calendar
          onChange={this.onChange}
          onClickMonth={this.onClickMonth}
          value={this.state.date}
        />
      </div>
    );
  };
}