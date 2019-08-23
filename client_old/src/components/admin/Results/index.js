import React, { Component } from 'react';
import * as AdminActions from '../../../actions/admin';
import { connect } from 'react-redux';
import _ from 'lodash';
import Points from '../../../constants/points';
import LeaderboardBlock from '../../LeaderboardBlock';
import './style.css';

class Results extends Component {
    async componentWillMount() {
        const { username, password } = this.props.admin.credentials;
        const { eventId } = this.props.match.params;
        this.props.getSubmissions(username, password, eventId);
    }

    getUserPoints(submissions) {
        let points = 0;

        if (!submissions) {
            return 0;
        }

        const unique = {};

        _.each(submissions, submission => {
            if (unique.hasOwnProperty(submission.challengeId)) {
                if (unique[submission.challengeId].status < submission.reviewStatus) {
                    unique[submission.challengeId] = {
                        status: submission.reviewStatus,
                        points: Points[submission.challengeDifficulty]
                    };
                }
            } else {
                unique[submission.challengeId] = {
                    status: submission.reviewStatus,
                    points: Points[submission.challengeDifficulty]
                };
            }
        });

        _.forOwn(unique, (value, key) => {
            if (value.status === 3) {
                points += value.points;
            }
            if (value.status === 2) {
                points += 0.5 * value.points;
            }
        });

        return points;
    }

    buildRows(submissions) {
        if (!submissions) return null;

        const byUser = _.groupBy(submissions, 'user.username');

        let rows = [];
        let totalPoints = 0;
        let totalSubmissions = 0;

        _.forOwn(byUser, (submissions, username) => {
            const points = this.getUserPoints(submissions);
            totalPoints += points;
            totalSubmissions += submissions.length;
            rows.push({
                username,
                points,
                submissions: submissions.length
            });
        });

        return {
            totalSubmissions,
            totalPoints,
            rows: _.reverse(_.sortBy(rows, 'points'))
        };
    }

    render() {
        const { rows, totalPoints, totalSubmissions } = this.buildRows(
            this.props.submissions[this.props.match.params.eventId]
        );

        console.log(this.props.events);

        const event = _.find(this.props.events, e => e._id === this.props.match.params.eventId);

        const eventName = event ? event.eventName : 'Unknown event';

        return (
            <div className="container">
                <LeaderboardBlock
                    title={'Results for ' + eventName}
                    items={rows}
                    limit={Infinity}
                    columns={[
                        {
                            key: 'rank',
                            name: 'Rank',
                            getValue: (item, index) => index + 1
                        },
                        {
                            key: 'username',
                            name: 'Username',
                            getValue: (item, index) => item.username
                        },
                        {
                            key: 'points',
                            name: 'Points',
                            getValue: (item, index) => item.points
                        }
                    ]}
                />
                <p className="Results--stat-row">Total points: {totalPoints}</p>
                <p className="Results--stat-row">Amount of submissions: {totalSubmissions}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin,
    submissions: state.admin.submissions.events,
    submissionsLoading: state.admin.submissions.loading,
    submissionsError: state.admin.submissions.error,
    events: state.admin.events.data,
    eventsLoading: state.admin.events.loading,
    eventsError: state.admin.events.error
});

const mapDispatchToProps = dispatch => ({
    getEvents: (username, password) => dispatch(AdminActions.getEvents(username, password)),
    getSubmissions: (username, password, eventId) =>
        dispatch(AdminActions.getSubmissionsForEvent(username, password, eventId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results);
