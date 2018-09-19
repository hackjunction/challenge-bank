import React from 'react';
import './style.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LeaderboardBlock from '../LeaderboardBlock';

import * as ScoresActions from '../../actions/scores';

class Lander extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            events: []
        };
    }

    componentWillMount() {
        this.props.updateEventScores();
        this.props.updateUserScores();
    }

    render() {
        if (!this.props.user) {
            return (
                <div className="container">
                    <div className="Lander--wrapper">
                        <h1 className="Lander--title">WELCOME TO THE CHALLENGE BANK!</h1>
                        <p className="Lander--text">
                            If you are at a TechRace or HackTour event, click below to register or log in and start
                            solving challenges. To register for an event, you'll need a <strong>secret code</strong>{' '}
                            which will be provided for you at the event. Happy hacking!
                        </p>
                        <div className="Lander--buttons">
                            <Link className="btn btn-default" to="/login">
                                Log in or Register
                            </Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="Lander--wrapper">
                        <h1 className="Lander--title">Welcome to {this.props.user.event.eventName}</h1>
                        <p className="Lander--text">
                            You're logged in as <strong>{this.props.user.username}</strong>
                        </p>
                        <div className="Lander--buttons">
                            <Link className="btn btn-default" to="/challenges">
                                View challenges
                            </Link>
                            <Link className="btn btn-default" to="/login">
                                Log out
                            </Link>
                        </div>
                    </div>
                    <div>
                        <LeaderboardBlock
                            title={'Top events'}
                            items={this.props.eventScores.data}
                            columns={[
                                {
                                    key: 'rank',
                                    name: 'Rank',
                                    getValue: (item, index) => index + 1
                                },
                                {
                                    key: 'event',
                                    name: 'Event',
                                    getValue: (item, index) => item.eventName
                                },
                                {
                                    key: 'score',
                                    name: 'Score',
                                    getValue: (item, index) => item.points
                                },
                                {
                                    key: 'weightedScore',
                                    name: 'Weighted Score',
                                    getValue: (item, index) => item.weightedPoints
                                }
                            ]}
                            isSelf={item => item.eventId === this.props.user.event._id}
                        />
                        <LeaderboardBlock
                            title={'Top users'}
                            items={this.props.userScores.data}
                            columns={[
                                {
                                    key: 'rank',
                                    name: 'Rank',
                                    getValue: (item, index) => index + 1
                                },
                                {
                                    key: 'user',
                                    name: 'Username',
                                    getValue: (item, index) => item.username
                                },
                                {
                                    key: 'score',
                                    name: 'Score',
                                    getValue: (item, index) => item.points
                                },
                                {
                                    key: 'event',
                                    name: 'Event',
                                    getValue: (item, index) => item.eventName
                                }
                            ]}
                            isSelf={item => item.userId === this.props.user._id}
                        />
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    eventScores: state.scores.events,
    userScores: state.scores.users
});

const mapDispatchToProps = dispatch => ({
    updateEventScores: () => dispatch(ScoresActions.getEventScores()),
    updateUserScores: () => dispatch(ScoresActions.getUserScores())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lander);
