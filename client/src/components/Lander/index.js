import React from 'react';
import './style.css';
import _ from 'lodash';
import moment from 'moment-timezone';

class Lander extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  async getEvents(event) {
    this.setState({
      loading: true
    });

    const response = await fetch('/api/events');
    const body = await response.json();

    if (body.status === 'success') {
      this.setState({
        loading: false,
        events: body.data,
        error: null
      });
      console.log('events', body.data);
    } else {
      this.setState({
        loading: false,
        error: body.data
      });
    }
  }

  renderEvents() {
    return _.map(this.state.events, event => {
      return (
        <li>
          <div className="flexrow">
            <b>{event.eventName}</b>
            {moment.tz(event.eventStartTime, event.timezone).format('MMM Qo') +
              ' (' +
              event.timezone +
              ')'}
          </div>
          <p className="location">{event.locationName}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="flexrow lander-flex">
          <div className="events landeritem">
            <h4 className="landertitle">Upcoming events</h4>
            <div className="underline" />
            <ul>{this.renderEvents()}</ul>
          </div>

          <div className="cities landeritem">
            <h4 className="landertitle">Current standings</h4>
            <div className="underline" />
          </div>
        </div>
      </div>
    );
  }
}

export default Lander;
