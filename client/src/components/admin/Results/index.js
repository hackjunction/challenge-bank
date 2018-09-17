import React, { Component } from 'react';
import * as AdminActions from '../../../actions/admin';
import { connect } from 'react-redux';
import _ from 'lodash';
import Points from '../../../constants/points';

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

        const blocks = _.map(rows, row => {
            return (
                <p>
                    USER: {row.username}, POINTS: {row.points}, SUBMISSIONS: {row.submissions}
                </p>
            );
        });

        return (
            <div className="container">
                <p>Total points: {totalPoints}</p>
                <p>Amount of submissions: {totalSubmissions}</p>
                {blocks}
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
