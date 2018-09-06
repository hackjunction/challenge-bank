import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import _ from 'lodash';
import moment from 'moment-timezone';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './style.css';
import * as EventActions from '../../../actions/events';

class EventsList extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        const { username, password } = this.props.admin.credentials;
        this.props.getEvents(username, password);
    }

    deleteEvent(event) {
        const { username, password } = this.props.admin.credentials;
        this.props.deleteEvent(username, password, event._id);
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
                        <p className="col-xs-12 col-sm-8 col-sm-offset-2 text-danger">{message}</p>
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
        return _.map(this.props.events, event => {
            return (
                <tr key={event._id}>
                    <th scope="row">{event.eventName}</th>
                    <td>{event.locationName}</td>
                    <td>
                        {moment.tz(event.eventStartTime, event.timezone).format('MMM Qo YYYY HH:mm') +
                            ' (' +
                            event.timezone +
                            ')'}
                    </td>
                    <td>
                        <div className="EventsList--options-wrapper">
                            <Link className="EventsList--options-button" to={`/admin/events/edit/${event._id}`}>
                                Edit
                            </Link>
                            <a
                                className="EventsList--options-button text-danger"
                                href=""
                                onClick={e => this.handleDelete(e, event)}
                            >
                                Delete
                            </a>
                        </div>
                    </td>
                    <td>
                        <div className="EventsList--options-wrapper">
                            <Link className="EventsList--options-button" to={`/admin/submissions/${event._id}`}>
                                View submissions
                            </Link>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="EventsList--container container">
                <div className="EventsList--header">
                    <div className="left">
                        <h1 className="EventsList--title">All Events</h1>
                        {this.props.eventsLoading ? <Spinner name="circle" fadeIn="quarter" /> : null}
                    </div>
                    <Link className="btn btn-default" to="/admin/events/create">
                        Create new event
                    </Link>
                </div>
                {this.props.eventsError ? (
                    <div className="alert alert-danger" role="alert">
                        {'Something went wrong while getting events - refresh the page to try again'}
                    </div>
                ) : null}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">Options</th>
                            <th scope="col">Submissions</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderEvents()}</tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin,
    events: state.events.events,
    eventsLoading: state.events.loading,
    eventsError: state.events.error
});

const mapDispatchToProps = dispatch => ({
    getEvents: (username, password) => dispatch(EventActions.getEvents(username, password)),
    deleteEvent: (username, password, eventId) => dispatch(EventActions.deleteEvent(username, password, eventId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsList);
