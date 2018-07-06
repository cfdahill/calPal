import React from "react";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

class Calendar extends React.Component {
  state = {
    events: [
      {
        title: '4pm Dbacks',
        allDay: false,
        start: new Date(2018, 6, 26, 10, 0),
        end: new Date(2018, 6, 26, 14, 0)
      }
    ]
  }

  componentDidMount() {
    this.getUserEvents();
    this.handleSportChange();
  }

  render() {
    return (
      <div id="calContainer"
            style={{height: 600,
                    width: 800}}>
        <FullCalendar
          id = "calendarID"
          header = {{
            left: 'prev, next, today',
            center: 'title',
            right: 'month, basicWeek, basicDay, list'
          }}
          events = {this.state.events}
          style={{background: "red"}}
        />
      </div>
    )
  }

  getUserEvents() {
    console.log(this.props)
  }

  handleSportChange() {
    fetch("https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-2019-regular/full_game_schedule.json", {
      method: "GET",
      headers: {
        // TODO: put the password in ENV 
        "Authorization": "Basic " + btoa("cdplourde" + ":" + "Pass4Class")
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
}

export default Calendar;