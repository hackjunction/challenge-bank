import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Markdown from 'react-markdown';
import './style.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import API from '../../services/api';
import { ClipLoader, BarLoader } from 'react-spinners';
import Countdown from 'react-countdown-now';
import moment from 'moment-timezone';
import Points from '../../constants/points';

class Challenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer: '',
            submitted: false,
            error: '',
            loading: false
        };

        this.onAnswerChange = this.onAnswerChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onAnswerChange(event) {
        this.setState({ answer: event.target.value });
    }

    onSeeDetails() {
        window.scrollTo({
            top: 300,
            behavior: 'smooth'
        });
    }

    async onSubmit() {
        this.setState({
            loading: true
        });

        const singleChallenge = _.find(this.props.data.allChallenges, challenge => {
            return challenge.id === this.props.match.params.id;
        });

        API.userCreateSubmission(this.props.user.token, {
            answer: this.state.answer,
            challengeId: this.props.match.params.id,
            challengeDifficulty: singleChallenge.challengeDifficulty.difficultyvalue
        })
            .then(submission => {
                this.setState({
                    loading: false,
                    submitted: true
                });
            })
            .catch(error => {
                console.log('ERROR', error);
                this.setState({
                    loading: false,
                    submitted: false,
                    error: 'Oops, something went wrong...'
                });
            });
    }
    renderChallenges() {
        const singleChallenge = _.find(this.props.data.allChallenges, challenge => {
            return challenge.id === this.props.match.params.id;
        });
        let filtered;
        filtered = _.filter(this.props.data.allChallenges, challenge => {
            return challenge.challengeCategory.name === singleChallenge.challengeCategory.name;
        });
        if (filtered.length !== 0) {
            filtered = _.reject(filtered, function(el) {
                return el.name === singleChallenge.name;
            }).slice(0, 4);
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
                                    <Link
                                        to={`/challenge/${challenge.id}`}
                                        className="grid-link"
                                        onClick={this.onSeeDetails()}
                                    >
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
                    <h5>No more challenges in this category!</h5>
                </div>
            );
        }
    }

    renderLoading() {
        return (
            <div className="loader">
                <ClipLoader sizeUnit={'px'} size={80} color={'black'} />
                <p>Loading Challenge...</p>
            </div>
        );
    }

    renderError() {
        return (
            <div className="error">
                <h2>Something went wrong while fetching the challenge!</h2>
                <p>
                    <Link to={this.props.location} onClick={() => window.location.reload()} className="errorLink">
                        Try Again
                    </Link>
                    or maybe go back to
                    <Link to="/challenges" className="errorLink">
                        the Challenge List
                    </Link>
                </p>
            </div>
        );
    }

    renderForm() {
        const { event } = this.props.user;

        const submitted = _.findIndex(this.props.submissions.data, submission => {
            return submission.challengeId === this.props.match.params.id && submission.reviewStatus === 0;
        });

        const accepted = _.findIndex(this.props.submissions.data, submission => {
            return submission.challengeId === this.props.match.params.id && submission.reviewStatus === 3;
        });

        const isPending = submitted !== -1;
        const isAccepted = accepted !== -1;

        const now = moment().tz(event.timezone);
        const startTime = moment(event.platformOpens).tz(event.timezone);
        const endTime = moment(event.platformCloses).tz(event.timezone);

        if (now.isAfter(startTime) && now.isBefore(endTime)) {
            if (this.state.submitted) {
                return (
                    <div className="Challenge--submit">
                        <h3 className="Challenge--submitted">Thanks for submitting your answer!</h3>
                    </div>
                );
            } else if (isPending) {
                return (
                    <div className="Challenge--submit">
                        <h3 className="Challenge--submitted">Your previous submission is still under review</h3>
                    </div>
                );
            } else if (isAccepted) {
                return (
                    <div className="Challenge--submit">
                        <h3 className="Challenge--submitted">
                            You've already submitted an accepted solution. Congrats!
                        </h3>
                    </div>
                );
            } else {
                return (
                    <div className="Challenge--submit">
                        <input
                            className="Challenge--submit-answer"
                            onChange={this.onAnswerChange}
                            value={this.state.answer}
                            placeholder={'Type your answer here'}
                        />
                        <button
                            className="Challenge--submit-button"
                            disabled={this.state.loading}
                            onClick={this.onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                );
            }
        } else {
            if (now.isBefore(startTime)) {
                return (
                    <div className="Challenge--submit">
                        <h3 className="Challenge--submitted">
                            Submissions open in <Countdown date={startTime.toDate()} />
                        </h3>
                    </div>
                );
            } else {
                return (
                    <div className="Challenge--submit">
                        <h3 className="Challenge--submitted">Submissions closed!</h3>
                    </div>
                );
            }
        }
    }

    render() {
        const { error, loading } = this.props.data;
        const singleChallenge = _.find(this.props.data.allChallenges, challenge => {
            return challenge.id === this.props.match.params.id;
        });

        if (error) return this.renderError();
        if (loading) return this.renderLoading();

        if (!singleChallenge) return <Redirect to="/404" />;

        const categoryStyle = {
            color: `rgba(${Object.values(JSON.parse(singleChallenge.challengeCategory.color)).join(',')})`
        };

        return (
            <div className="container">
                <Link to={`/challenges/`} className="Challenge--challenges">
                    Back to Challenge list
                </Link>
                <div className="Challenge--container row">
                    <div className="Challenge--header">
                        <span
                            className="Challenge--category"
                            style={{
                                color: categoryStyle.color
                            }}
                        >
                            {singleChallenge.challengeCategory.name}
                        </span>
                        <span className="Challenge--difficulty">{singleChallenge.challengeDifficulty.name}</span>
                    </div>
                    <p>
                        <strong>
                            Points earned for completion: {Points[singleChallenge.challengeDifficulty.difficultyvalue]}
                        </strong>
                    </p>
                    <div className="Challenge--content">
                        <h1 className="Challenge--name">{singleChallenge.name}</h1>
                        <Markdown
                            className="Challenge--description"
                            source={singleChallenge.description}
                            escapeHtml={false}
                        />
                        {_.map(singleChallenge.attachments, attachment => (
                            <a href={attachment.url} download={attachment.fileName} target="_blank">
                                {attachment.fileName}
                            </a>
                        ))}
                    </div>
                    {this.renderForm()}
                </div>
                <h1 className="Challenge--challenges">More challenges in this category:</h1>
                {this.renderChallenges()}
            </div>
        );
    }
}

export const allChallenges = gql`
    query allChallenges {
        allChallenges(filter: { isPublished: true }) {
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
            attachments {
                id
                fileName
                url
            }
        }
        _allChallengesMeta {
            count
        }
    }
`;

const mapStateToProps = state => ({
    user: state.user.user,
    submissions: state.user.submissions
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(graphql(allChallenges)(Challenge));
