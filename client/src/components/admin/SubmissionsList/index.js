import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import * as AdminActions from '../../../actions/admin';
import './style.css';

import SubmissionsTable from './SubmissionsTable';
import SelectedSubmission from './SelectedSubmission';

class SubmissionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            challengeMap: {},
            difficulties: [],
            categories: [],
            selectedSubmission: null
        };

        this.setSelected = this.setSelected.bind(this);
        this.clearSelected = this.clearSelected.bind(this);
    }

    async componentWillMount() {
        const { username, password } = this.props.admin.credentials;
        const { eventId } = this.props.match.params;
        let event = this.findEvent(eventId, this.props.events);

        if (!event) {
            const { username, password } = this.props.admin.credentials;
            this.props.getEvents(username, password);
        }

        this.props.getSubmissions(username, password, eventId);
    }

    findEvent(eventId, events = []) {
        return _.find(events, event => {
            return event._id === eventId;
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.allChallenges !== this.props.data.allChallenges) {
            this.updateChallengeMap(nextProps.data.allChallenges);
        }
    }

    updateChallengeMap(challenges) {
        const challengeMap = {};
        const difficulties = [];
        const categories = [];

        const c = _.filter(challenges, challenge => {
            if (!challenge.challengeDifficulty) {
                console.log('NO DIFFICULTY', challenge);
                return false;
            }

            if (!challenge.challengeCategory) {
                console.log('NO CATEGORY', challenge);
                return false;
            }

            return true;
        });

        _.each(c, challenge => {
            challengeMap[challenge.id] = challenge;
            difficulties.push(challenge.challengeDifficulty.name);
            categories.push(challenge.challengeCategory.name);
        });

        this.setState({
            challengeMap,
            difficulties: _.uniq(difficulties),
            categories: _.uniq(categories)
        });
    }

    mapChallengesToSubmissions(submissions) {
        return _.map(submissions, submission => {
            submission.challenge = this.state.challengeMap[submission.challengeId];
            return submission;
        });
    }

    setSelected(submission) {
        this.setState({
            selectedSubmission: submission
        });
    }

    clearSelected(submission) {
        this.setState({
            selectedSubmission: null
        });

        const { username, password } = this.props.admin.credentials;
        const { eventId } = this.props.match.params;

        this.props.getSubmissions(username, password, eventId);
    }

    render() {
        const { eventId } = this.props.match.params;
        const event = this.findEvent(eventId, this.props.events);

        if (!this.props.eventsLoading && !event) {
            return (
                <div>
                    <h1>Event not found</h1>
                </div>
            );
        }

        const loading = this.props.submissionsLoading || this.props.eventsLoading || this.props.data.loading;
        const submissions = this.mapChallengesToSubmissions(this.props.submissions[eventId]);

        return (
            <div>
                <div className="SubmissionsList--container col-xs-12">
                    <div className="SubmissionsList--header">
                        <div className="top">
                            <h1 className="title">Submissions</h1>
                            {loading ? <Spinner name="circle" fadeIn="quarter" /> : null}
                        </div>
                        <div className="bottom">
                            <h5>{event.eventName + ' | ' + submissions.length + ' submissions'}</h5>
                        </div>
                    </div>
                    <div className="SubmissionsList--selected">
                        <SelectedSubmission
                            submission={this.state.selectedSubmission}
                            adminUsername={this.props.admin.credentials.username}
                            adminPassword={this.props.admin.credentials.password}
                            onClose={this.clearSelected}
                            onClear={() => this.setState({ selectedSubmission: null })}
                        />
                    </div>
                    {!loading ? <SubmissionsTable data={submissions} onSelect={this.setSelected} /> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin,
    submissions: state.admin.submissions.events,
    submissionsLoading: state.submissions.events.loading,
    submissionsError: state.submissions.events.error,
    events: state.admin.events.data,
    eventsLoading: state.admin.events.loading,
    eventsError: state.admin.events.error
});

const mapDispatchToProps = dispatch => ({
    getEvents: (username, password) => dispatch(AdminActions.getEvents(username, password)),
    getSubmissions: (username, password, eventId) =>
        dispatch(AdminActions.getSubmissionsForEvent(username, password, eventId))
});

export const allChallenges = gql`
    query allChallenges {
        allChallenges {
            id
            name
            shortDescription
            description
            challengeCategory {
                color
                name
            }
            challengeDifficulty {
                name
                difficultyvalue
            }
            answer
        }
        _allChallengesMeta {
            count
        }
    }
`;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(graphql(allChallenges)(SubmissionsList));
