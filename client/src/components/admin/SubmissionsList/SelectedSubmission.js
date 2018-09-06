import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import TimeAgo from 'react-timeago';
import API from '../../../services/api';

class SelectedSubmission extends Component {
    static propTypes = {
        submission: PropTypes.object,
        adminUsername: PropTypes.string.isRequired,
        adminPassword: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            feedback: ''
        };

        this.close = this.close.bind(this);
    }

    close() {
        this.props.onClose();
    }

    submitReview(decision) {
        if (decision === 1 || decision === 2) {
            if (!this.state.feedback) {
                window.alert('Please type some feedback if not giving full points :)');
                return;
            }
        }

        API.adminReviewSubmission(
            this.props.adminUsername,
            this.props.adminPassword,
            this.props.submission._id,
            decision,
            this.state.feedback
        )
            .then(submission => {
                this.close();
            })
            .catch(error => {
                window.alert('Oops, something went wrong...');
            });
    }

    render() {
        if (!this.props.submission) {
            return (
                <div className="SelectedSubmission--wrapper">
                    <div className="SelectedSubmission--row-content">
                        <span>No submission selected for review</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="SelectedSubmission--wrapper">
                    <div className="SelectedSubmission--close">
                        <p className="SelectedSubmission--close-button" onClick={this.close}>
                            X Close
                        </p>
                    </div>
                    <div className="SelectedSubmission--row">
                        <span className="SelectedSubmission--row-title">Challenge name</span>
                        <div className="SelectedSubmission--row-content">
                            <span className="SelectedSubmission--challenge-name">
                                {this.props.submission.challenge.name}{' '}
                            </span>
                        </div>
                    </div>
                    <div className="SelectedSubmission--row">
                        <span className="SelectedSubmission--row-title">Submitted</span>
                        <div className="SelectedSubmission--row-content">
                            <TimeAgo
                                className="SelectedSubmission--challenge-name"
                                date={this.props.submission.timestamp}
                            />
                        </div>
                    </div>
                    <div className="SelectedSubmission--row">
                        <span className="SelectedSubmission--row-title">Challenge description</span>
                        <div className="SelectedSubmission--row-content">
                            <Markdown
                                className="Challenge--description"
                                source={this.props.submission.challenge.description}
                                escapeHtml={false}
                            />
                        </div>
                    </div>
                    <div className="SelectedSubmission--row">
                        <span className="SelectedSubmission--row-title">Submitted answer</span>
                        <div className="SelectedSubmission--row-content">
                            <span className="SelectedSubmission--challenge-name">{this.props.submission.answer}</span>
                        </div>
                    </div>
                    <div className="SelectedSubmission--row">
                        <span className="SelectedSubmission--row-title">Correct answer</span>
                        <div className="SelectedSubmission--row-content">
                            <Markdown
                                className="Challenge--description"
                                source={this.props.submission.challenge.answer}
                                escapeHtml={false}
                            />
                        </div>
                    </div>
                    <div className="SelectedSubmission--row">
                        <span className="SelectedSubmission--row-title">Review</span>
                        <div className="SelectedSubmission--row-content">
                            <div class="SelectedSubmission--review-options">
                                <input
                                    className="SelectedSubmission--review-feedback"
                                    placeholder="Type some feedback"
                                    value={this.state.feedback}
                                    onChange={event => this.setState({ feedback: event.target.value })}
                                />
                                <button
                                    className="SelectedSubmission--review-option btn btn-danger"
                                    onClick={() => this.submitReview(1)}
                                >
                                    Decline
                                </button>
                                <button
                                    className="SelectedSubmission--review-option btn btn-warning"
                                    onClick={() => this.submitReview(2)}
                                >
                                    Half points
                                </button>
                                <button
                                    className="SelectedSubmission--review-option btn btn-success"
                                    onClick={() => this.submitReview(3)}
                                >
                                    Full points
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default SelectedSubmission;
