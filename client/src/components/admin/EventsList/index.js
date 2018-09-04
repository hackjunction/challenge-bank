import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import _ from 'lodash';
import moment from 'moment-timezone';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './style.css';
import API from '../../../services/api';

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
    }

    async getEvents(event) {
        this.setState({
            loading: true
        });

        const { username, password } = this.props.admin.credentials;

        API.adminGetEvents(username, password)
            .then(events => {
                this.setState({
                    loading: false,
                    events,
                    error: null
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: 'Oops, something went wrong'
                });
            });
    }

    async deleteEvent(event) {
        this.setState({
            loading: true
        });

        const { username, password } = this.props.admin.credentials;

        API.adminDeleteEvent(username, password, event._id)
            .then(() => {
                this.getEvents();
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: 'Oops, something went wrong'
                });
            });
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
        return _.map(this.state.events, event => {
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
                            <a className="EventsList--options-button" href={`/admin/events/edit/${event._id}`}>
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
        if (this.state.loading) {
            return (
                <div className="EventsList--loading container">
                    <h3>Loading events</h3>
                    <Spinner name="circle" />
                </div>
            );
        }

        return (
            <div className="EventsList--container container">
                <h1 className="EventsList--title">All Events</h1>
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.error + ' - Refresh the page to try again'}
                    </div>
                ) : null}
                <table className="table">
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
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsList);
