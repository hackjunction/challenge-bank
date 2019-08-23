import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Countdown from 'react-countdown-now';
import './style.css';

class EventTimer extends Component {
    static propTypes = {
        event: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        setInterval(
            function() {
                this.forceUpdate();
            }.bind(this),
            5000
        );
    }

    render() {
        if (!this.props.event) return null;

        const { event } = this.props;

        const now = moment().tz(event.timezone);
        const startTime = moment(event.platformOpens).tz(event.timezone);
        const endTime = moment(event.platformCloses).tz(event.timezone);

        if (now.isBefore(startTime)) {
            return (
                <div className="EventTimer waiting">
                    <div className="EventTimer--top waiting">{this.props.event.eventName}</div>
                    <div className="EventTimer--bottom">
                        <p className="EventTimer--event-name">Submissions not yet open</p>
                        <p className="EventTimer--time">
                            Submissions open in <Countdown date={startTime.toDate()} />
                        </p>
                    </div>
                </div>
            );
        } else if (now.isBefore(endTime)) {
            return (
                <div className="EventTimer open">
                    <div className="EventTimer--top open">{this.props.event.eventName}</div>
                    <div className="EventTimer--bottom">
                        <p className="EventTimer--event-name">Submissions are open</p>
                        <p className="EventTimer--time">
                            Submissions close in <Countdown date={endTime.toDate()} />
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="EventTimer waiting">
                    <div className="EventTimer--top closed">{this.props.event.eventName}</div>
                    <div className="EventTimer--bottom">
                        <p className="EventTimer--event-name">Submissions closed! Thanks for participating!</p>
                    </div>
                </div>
            );
        }
    }
}

export default EventTimer;
