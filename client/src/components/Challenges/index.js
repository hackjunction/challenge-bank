import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ClipLoader, BarLoader } from 'react-spinners';
import _ from 'lodash';
import './style.css';
import { connect } from 'react-redux';
import * as SubmissionsActions from '../../actions/submissions';
import * as Review from '../../constants/review';

import DifficultyFilters from '../DifficultyFilters/';
import CategoryFilters from '../CategoryFilters/';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulties: [],
            categories: [],
            selectedDifficulties: [],
            selectedCategories: [],
            showOwn: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.userGetSubmissions(this.props.user.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.allChallenges !== this.props.data.allChallenges) {
            const newState = {};
            const { categories, difficulties } = this.getDifficultiesAndCategories(nextProps.data.allChallenges);
            newState.categories = categories;
            newState.difficulties = difficulties;
            if (!this.props.data.allChallenges && nextProps.data.allChallenges) {
                newState.selectedDifficulties = difficulties;
                newState.selectedCategories = categories;
            }

            this.setState(newState);
        }
    }

    handleClick(boolean) {
        this.setState({ showOwn: boolean });
    }

    getDifficultiesAndCategories(challenges) {
        const difficulties = [];
        const categories = [];

        _.each(challenges, challenge => {
            if (challenge.challengeDifficulty) {
                if (_.findIndex(difficulties, o => o.name === challenge.challengeDifficulty.name) === -1) {
                    difficulties.push(challenge.challengeDifficulty);
                }
            }

            if (challenge.challengeCategory) {
                if (_.findIndex(categories, o => o.name === challenge.challengeCategory.name) === -1) {
                    categories.push(challenge.challengeCategory);
                }
            }
        });

        return {
            difficulties,
            categories
        };
    }

    filterChallenges() {
        return _.filter(this.props.data.allChallenges, challenge => {
            if (!challenge.challengeDifficulty || !challenge.challengeCategory) {
                return false;
            }

            const catName = challenge.challengeCategory.name;
            const diffName = challenge.challengeDifficulty.name;

            if (_.findIndex(this.state.selectedCategories, c => c.name === catName) !== -1) {
                if (_.findIndex(this.state.selectedDifficulties, d => d.name === diffName) !== -1) {
                    return true;
                }
            }

            return false;
        });
    }

    renderChallenges() {
        const filtered = this.filterChallenges();
        if (filtered.length !== 0) {
            return (
                <div className="row">
                    <div className="grid">
                        {_.map(filtered, challenge => (
                            <div className="grid-item" key={`challenge-${challenge.id}`}>
                                <div className="grid-content">
                                    <div className="flexrow">
                                        <p
                                            className="category"
                                            style={{
                                                color: `rgba(${Object.values(
                                                    JSON.parse(challenge.challengeCategory.color)
                                                ).join(',')})`
                                            }}
                                        >
                                            <b>{challenge.challengeCategory.name}</b>
                                        </p>
                                        <p className="difficulty">{challenge.challengeDifficulty.name}</p>
                                    </div>
                                    <h5>{challenge.name}</h5>
                                    <p>{challenge.shortDescription}</p>
                                </div>
                                <div className="flexrow">
                                    <Link to={`/challenge/${challenge.id}`} className="grid-link">
                                        See Details >
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <h5 className="Challenges--no-challenges-text">No challenges found with those filters...</h5>
                </div>
            );
        }
    }

    renderLoading() {
        return (
            <div className="loader">
                <ClipLoader sizeUnit={'px'} size={80} color={'black'} />
                <p>Loading Challenges...</p>
            </div>
        );
    }

    renderError() {
        return (
            <div className="error">
                <h2>Something went wrong while fetching the challenges</h2>
                <p>
                    <Link to="/challenges" onClick={() => window.location.reload()} className="errorLink">
                        Try Again
                    </Link>
                    or maybe go back to
                    <Link to="/" className="errorLink">
                        Home Page
                    </Link>
                </p>
            </div>
        );
    }

    render() {
        const { error, loading } = this.props.data;
        const { submissions } = this.props;
        if (error) return this.renderError();
        if (loading) return this.renderLoading();

        return (
            <div className="container">
                {this.state.showOwn ? (
                    <h5 onClick={() => this.handleClick(false)}>Hide own submissions</h5>
                ) : (
                    <h5 onClick={() => this.handleClick(true)}>Show own submissions</h5>
                )}
                {submissions.length !== 0 && this.state.showOwn ? (
                    <React.Fragment>
                        <div className="row">
                            <div className="grid">
                                {_.map(submissions.undefined, submission => (
                                    <div className="grid-item">
                                        <div className="grid-content">
                                            <div className="flexrow">
                                                <p
                                                    className="category"
                                                    style={{
                                                        color: `${Review.Status[submission.reviewStatus].color}`
                                                    }}
                                                >
                                                    <b>{Review.Status[submission.reviewStatus].name}</b>
                                                </p>
                                            </div>
                                            <React.Fragment>
                                                <h5>
                                                    {_.result(
                                                        _.find(this.props.data.allChallenges, function(obj) {
                                                            return obj.id === submission.challengeId;
                                                        }),
                                                        'name'
                                                    )}
                                                </h5>
                                                {console.log(submission)}
                                                <p>
                                                    Your answer: <i>{submission.answer}</i>
                                                </p>
                                                {submission.reviewFeedback.length !== 0 ? (
                                                    <p>Feedback: {submission.reviewFeedback}</p>
                                                ) : null}
                                                <Link to={`/challenge/${submission.challengeId}`} className="grid-link">
                                                    See challenge >
                                                </Link>
                                            </React.Fragment>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                ) : null}
                <div className="Challenges--filters-wrapper">
                    <DifficultyFilters
                        difficulties={this.state.difficulties}
                        selectedDifficulties={this.state.selectedDifficulties}
                        onChange={selectedDifficulties => this.setState({ selectedDifficulties })}
                    />
                    <CategoryFilters
                        categories={this.state.categories}
                        selectedCategories={this.state.selectedCategories}
                        onChange={selectedCategories => this.setState({ selectedCategories })}
                    />
                </div>
                <div className="Challenges--challenges-wrapper">{this.renderChallenges()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    submissions: state.submissions.submissions
});

const mapDispatchToProps = dispatch => ({
    userGetSubmissions: token => dispatch(SubmissionsActions.userGetSubmissions(token))
});

export const allChallenges = gql`
    query allChallenges {
        allChallenges(filter: { isPublished: true }) {
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
            isPublished
        }
        _allChallengesMeta {
            count
        }
    }
`;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(graphql(allChallenges)(Home));
