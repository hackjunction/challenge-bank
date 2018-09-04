import React from 'react';
import './style.css';
import _ from 'lodash';
import moment from 'moment-timezone';
import { ProgressBar } from 'react-bootstrap';
import API from '../../services/api';

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

        API.getEvents()
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
                    error: 'Oops, something'
                });
            });
    }

    renderEvents() {
        return _.map(this.state.events, event => {
            return (
                <li>
                    <div className="flexrow">
                        <b>{event.eventName}</b>
                        <div className="date">{moment.tz(event.eventStartTime, event.timezone).format('Q.M.')}</div>
                    </div>
                    <p className="location">{event.locationName}</p>
                    <div className="underline-small" />
                </li>
            );
        });
    }

    renderBars() {
        return _.map(this.state.events, event => {
            // event point amount has to be added, must set max to fit max-points amount. Needs backend changes.
            return <ProgressBar active now={45} label={event.eventName} />;
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
                        {this.renderBars()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Lander;
