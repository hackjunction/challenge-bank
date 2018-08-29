import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './style.css';

class SubmissionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            submissions: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && !nextProps.data.loading) {
            this.getSubmissions();
        }
    }

    async getSubmissions() {
        this.setState({
            loading: true
        });

        try {
            const response = await fetch('/api/submissions');
            const body = await response.json();

            if (body.status === 'success') {
                this.setState({
                    loading: false,
                    submissions: this.mapSubmissionsToChallenges(body.data),
                    error: null
                });
            } else {
                this.setState({
                    loading: false,
                    error: body.data
                });
            }
        } catch (error) {
            console.log(error);
            this.setState({
                loading: false,
                error: error
            });
        }
    }

    mapSubmissionsToChallenges(submissions) {
        const mapped = _.map(submissions, submission => {
            const challenge = _.find(this.props.data.allChallenges, challenge => {
                return challenge.id === submission.challengeId;
            });

            submission.challenge = challenge;
            return submission;
        });

        return _.filter(mapped, m => typeof m.challenge != 'undefined');
    }

    renderSubmissions() {
        return _.map(this.state.submissions, submission => {
            return (
                <div key={submission._id} className="SubmissionsList--item-wrapper">
                    <p className="SubmissionsList--item-challengeName">{submission.challenge.name}</p>
                    <p className="SubmissionsList--item-timestamp">{submission.timestamp}</p>
                    <p className="SubmissionsList--item-answer">{submission.answer}</p>
                </div>
            );
        });
    }

    render() {
        console.log(this.state.submissions);
        return (
            <div className="SubmissionsList--container container">
                <h1 className="SubmissionsList--title">Submissions</h1>
                {this.renderSubmissions()}
            </div>
        );
    }
}

export const allChallenges = gql`
    query allChallenges {
        allChallenges {
            id
            name
            shortDescription
            challengeCategory {
                color
                name
            }
            challengeDifficulty {
                name
                difficultyvalue
            }
        }
        _allChallengesMeta {
            count
        }
    }
`;

export default graphql(allChallenges)(SubmissionsList);
