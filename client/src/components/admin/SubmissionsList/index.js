import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './style.css';
import API from '../../../services/api';

import SubmissionsTable from './SubmissionsTable';

class SubmissionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            submissions: [],
            difficulties: []
        };
        this.renderDifficultyfilters = this.renderDifficultyfilters.bind(this);
        this.checkDifficulty = this.checkDifficulty.bind(this);
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

        const { username, password } = this.props.admin.credentials;

        API.adminGetSubmissions(username, password)
            .then(submissions => {
                this.setState({
                    loading: false,
                    error: null,
                    submissions: this.mapSubmissionsToChallenges(submissions)
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: 'Oops, something went wrong...'
                });
            });
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

    checkDifficulty(difficulty) {
        if (this.state.difficulties.includes(difficulty)) {
            this.setState({
                difficulties: _.pull(this.state.difficulties, difficulty)
            });
        } else {
            this.setState({
                difficulties: _.concat(this.state.difficulties, difficulty)
            });
        }
    }

    renderDifficultyfilters() {
        const allDifficulties = _.uniq(
            _.map(
                _.sortBy(_.map(this.props.data.allChallenges, 'challengeDifficulty'), [
                    function(o) {
                        if (o) {
                            return o.difficultyvalue;
                        }
                    }
                ]),
                difficulty => {
                    if (difficulty && difficulty.name) {
                        return difficulty.name;
                    }
                }
            )
        );
        return _.map(allDifficulties, filter => {
            if (filter) {
                return (
                    <label className="filteritem">
                        <div className="checkboxcontainer">
                            <input
                                type="checkbox"
                                checked={this.state.difficulties.includes(filter)}
                                onChange={() => this.checkDifficulty(filter)}
                            />
                            <span className="checkmark" />
                        </div>
                        {filter}
                    </label>
                );
            }
        });
    }

    render() {
        let filtered;
        const { submissions } = this.state;
        if (this.state.difficulties.length === 0) {
            filtered = _.filter(submissions, submission => {
                return submission.challenge.challengeDifficulty;
            });
            console.log(_.difference(submissions, filtered));
        } else {
            filtered = _.filter(submissions, submission => {
                if (submission.challenge.challengeDifficulty) {
                    return (
                        this.state.difficulties.includes(submission.challenge.challengeDifficulty.name) &&
                        submission.challenge.challengeDifficulty
                    );
                }
            });
        }
        return (
            <div className="SubmissionsList--container">
                <div className="SubmissionsTable--wrapper">
                    <h1 className="SubmissionsList--title">Submissions</h1>
                    <div className="filterboxes">{this.renderDifficultyfilters()}</div>
                    <SubmissionsTable data={filtered} />
                </div>
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

export default graphql(allChallenges)(SubmissionsList);
