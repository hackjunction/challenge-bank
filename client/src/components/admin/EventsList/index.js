import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import _ from 'lodash';
import moment from 'moment-timezone';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import * as UserActions from '../../../actions/user';
import './style.css';

class EventsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      events: []
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentWillMount() {
    this.getEvents();

    this.props.changePassword('salasana');
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
    } else {
      this.setState({
        loading: false,
        error: body.data
      });
    }
  }

  async deleteEvent(event) {
    this.setState({
      loading: true
    });

    const response = await fetch(`/api/events/${event._id}`, {
      method: 'DELETE'
    });
    const body = await response.json();

    if (body.status === 'success') {
      this.getEvents();
    } else {
      this.setState({
        loading: false,
        error: body.data
      });
    }
  }

  handleDelete(e, event) {
    e.preventDefault();

    const options = {
      title: `Are you sure you want to delete ${event.eventName}?`,
      message: 'You will not be able to recover the event once deleted',
      customUI: ({ title, message, onClose }) => (
        <div className="custom-ui">
          <div className="EventsList--delete-wrapper row">
            <h1 className="col-xs-12 col-sm-8 col-sm-offset-2">{title}</h1>
            <p className="col-xs-12 col-sm-8 col-sm-offset-2 text-danger">
              {message}
            </p>
            <div className="col-xs-12 col-sm-8 col-sm-offset-2">
              <button
                className="btn btn-danger pull-right"
                onClick={() => {
                  this.deleteEvent(event);
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
              <button className="btn btn-link pull-right" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    };

    confirmAlert(options);
  }

  renderEvents() {
    return _.map(this.state.events, event => {
      return (
        <tr>
          <th scope="row">{event.eventName}</th>
          <td>{event.locationName}</td>
          <td>
            {moment
              .tz(event.eventStartTime, event.timezone)
              .format('MMM Qo YYYY HH:mm') +
              ' (' +
              event.timezone +
              ')'}
          </td>
          <td>
            <div className="EventsList--options-wrapper">
              <a
                className="EventsList--options-button"
                href={`/admin/events/edit/${event._id}`}
              >
                Edit
              </a>
              <a
                className="EventsList--options-button text-danger"
                href=""
                onClick={e => this.handleDelete(e, event)}
              >
                Delete
              </a>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.props.myProp);

    if (this.state.loading) {
      return (
        <div className="EventsList--loading container">
          <h3>Loading events</h3>
          <Spinner name="circle" />
        </div>
      );
    }

    console.log('EVENTS', this.state.events);

    return (
      <div className="EventsList--container container">
        <h1 className="EventsList--title">All Events</h1>
        {this.state.error ? (
          <div className="alert alert-danger" role="alert">
            {this.state.error + ' - Refresh the page to try again'}
          </div>
        ) : null}
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Start Time</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>{this.renderEvents()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myProp: state.user
});

const mapDispatchToProps = dispatch => ({
  changePassword: password => dispatch(UserActions.setAdminPassword(password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsList);
