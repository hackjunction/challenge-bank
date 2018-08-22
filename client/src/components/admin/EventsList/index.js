import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import _ from 'lodash';
import moment from 'moment-timezone';
import './style.css';

class EventsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            events: []
        };
    }

    async componentWillMount() {
        this.setState({
            loading: true
        });

        const response = await fetch('/api/events');
        const body = await response.json();

        if (body.status === 'success') {
            this.setState({
                loading: false,
                events: body.data
            });
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
                <tr>
                    <th scope="row">{event.eventName}</th>
                    <td>{event.locationName}</td>
                    <td>
                        {moment.tz(event.eventStartTime, event.timezone).format('MMM Qo YYYY HH:mm') +
                            ' (' +
                            event.timezone +
                            ')'}
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

export default EventsList;
