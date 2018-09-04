import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Markdown from 'react-markdown';
import './style.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import API from '../../services/api';

class Challenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer: '',
            submitted: false,
            error: ''
        };

        this.onAnswerChange = this.onAnswerChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onAnswerChange(event) {
        this.setState({ answer: event.target.value });
    }

    async onSubmit(challenge) {
        this.setState({
            loading: true
        });

        console.log('CHA', challenge);

        API.userCreateSubmission(this.props.user.token, {
            answer: this.state.answer,
            challengeId: this.props.match.params.id,
            challengeDifficulty: challenge.challengeDifficulty.difficultyvalue
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
                    <h5>No more challenges in this category!</h5>
                </div>
            );
        }
    }

    render() {
        const { error, loading, Challenge } = this.props.data;
        const singleChallenge = _.find(this.props.data.allChallenges, challenge => {
            return challenge.id === this.props.match.params.id;
        });

        if (error) return <h1>Error fetching the challenge!</h1>;
        if (loading) return <h1>Loading challenge...</h1>;

        const categoryStyle = {
            color: `rgba(${Object.values(JSON.parse(singleChallenge.challengeCategory.color)).join(',')})`
        };

        return (
            <div className="container">
                <Link to={`/challenges/`} className="Challenge--challenges">
                    Back to Challenge list
                </Link>
                <div className="Challenge--container">
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
                    {this.state.submitted ? (
                        <div className="Challenge--submit">
                            <h3 className="Challenge--submitted">Thanks for submitting your answer!</h3>
                        </div>
                    ) : (
                        <div className="Challenge--submit">
                            <input
                                className="Challenge--submit-answer"
                                onChange={this.onAnswerChange}
                                value={this.state.answer}
                                placeholder={'Type your answer here'}
                            />
                            <button className="Challenge--submit-button" onClick={() => this.onSubmit(singleChallenge)}>
                                Submit
                            </button>
                        </div>
                    )}
                </div>
                <h1 className="Challenge--challenges">See More {singleChallenge.challengeCategory.name} Challenges:</h1>
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
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(graphql(allChallenges)(Challenge));
