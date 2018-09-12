import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import Points from '../../constants/points';
import _ from 'lodash';
import './style.css';
import { Link } from 'react-router-dom';

import * as UserActions from '../../actions/user';

class SubmissionsBlock extends Component {
    static propTypes = {
        user: PropTypes.object,
        submissions: PropTypes.object,
        challenges: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    componentDidMount() {
        this.props.userGetSubmissions(this.props.user.token);
    }

    renderPendingSubmission(submission) {
        const challenge = _.find(this.props.challenges, c => c.id === submission.challengeId);

        return (
            <div className="SubmissionsBlock--submission pending">
                <div className="SubmissionsBlock--submission-top">
                    <span className="SubmissionsBlock--submission-challenge">{challenge.name} </span>
                    <TimeAgo className="SubmissionsBlock--submission-timeago" date={submission.timestamp} />
                </div>
                <p className="SubmissionsBlock--submission-answer">
                    <strong>Your answer: </strong>
                    <br />
                    {submission.answer}
                </p>
            </div>
        );
    }

    renderRejectedSubmission(submission) {
        const challenge = _.find(this.props.challenges, c => c.id === submission.challengeId);

        return (
            <div className="SubmissionsBlock--submission rejected">
                <div className="SubmissionsBlock--submission-top">
                    <span className="SubmissionsBlock--submission-challenge">{challenge.name} </span>
                    <TimeAgo className="SubmissionsBlock--submission-timeago" date={submission.timestamp} />
                </div>
                <p className="SubmissionsBlock--submission-answer">
                    <strong>Your answer: </strong>
                    <br />
                    {submission.answer}
                </p>
                <p className="SubmissionsBlock--submission-answer">
                    <strong>Reviewer feedback: </strong>
                    <br />
                    {submission.reviewFeedback}
                </p>
                <Link to={'/challenge/' + submission.challengeId}>Click to submit this challenge again</Link>
            </div>
        );
    }

    renderHalfpointsSubmission(submission) {
        const challenge = _.find(this.props.challenges, c => c.id === submission.challengeId);

        return (
            <div className="SubmissionsBlock--submission half-points">
                <div className="SubmissionsBlock--submission-top">
                    <span className="SubmissionsBlock--submission-challenge">{challenge.name} </span>
                    <span className="SubmissionsBlock--points-earned">
                        Earned points: {Points[submission.challengeDifficulty] / 2}
                    </span>
                </div>
                <p className="SubmissionsBlock--submission-answer">
                    <strong>Your answer: </strong>
                    <br />
                    {submission.answer}
                </p>
                <p className="SubmissionsBlock--submission-answer">
                    <strong>Reviewer feedback: </strong>
                    <br />
                    {submission.reviewFeedback}
                </p>
                <Link to={'/challenge/' + submission.challengeId}>Want full points? Submit this challenge again</Link>
            </div>
        );
    }

    renderAcceptedSubmission(submission) {
        const challenge = _.find(this.props.challenges, c => c.id === submission.challengeId);

        return (
            <div className="SubmissionsBlock--submission accepted">
                <div className="SubmissionsBlock--submission-top">
                    <span className="SubmissionsBlock--submission-challenge">{challenge.name} </span>
                    <span className="SubmissionsBlock--points-earned">
                        Earned points: {Points[submission.challengeDifficulty]}
                    </span>
                </div>
                <p className="SubmissionsBlock--submission-answer">
                    <strong>Your answer: </strong>
                    <br />
                    {submission.answer}
                </p>
            </div>
        );
    }

    getSubmissions(status) {
        if (!this.props.submissions || !this.props.submissions.data) {
            return [];
        }

        return _.filter(this.props.submissions.data, submission => {
            return submission.reviewStatus === status;
        });
    }

    renderSubmissions(status, submissions) {
        return _.map(submissions, submission => {
            if (status === 0) {
                return this.renderPendingSubmission(submission);
            }
            if (status === 1) {
                return this.renderRejectedSubmission(submission);
            }
            if (status === 2) {
                return this.renderHalfpointsSubmission(submission);
            }
            if (status === 3) {
                return this.renderAcceptedSubmission(submission);
            }
            return this.renderPendingSubmission(submission);
        });
    }

    getUserPoints() {
        let points = 0;

        if (!this.props.submissions || !this.props.submissions.data) {
            return 0;
        }

        const unique = {};

        _.each(this.props.submissions.data, submission => {
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

    render() {
        const iconClass = this.state.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        const contentClass = this.state.expanded ? 'SubmissionsBlock--content visible' : 'SubmissionsBlock--content';

        const pending = this.getSubmissions(0);
        const rejected = this.getSubmissions(1);
        const halfPoints = this.getSubmissions(2);
        const accepted = this.getSubmissions(3);
        const submissions = this.props.submissions && this.props.submissions.data ? this.props.submissions.data : [];

        const userPoints = this.getUserPoints();
        const barWidth = (100 * userPoints) / 300 + '%';

        return (
            <div className="SubmissionsBlock">
                <div
                    className="SubmissionsBlock--header"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <div className="SubmissionsBlock--header-left">
                        <span className="SubmissionsBlock--header-text">
                            Your submissions {'(' + submissions.length + ')'}
                        </span>
                    </div>
                    <i className={iconClass} />
                </div>
                <div className={contentClass}>
                    <div className="SubmissionsBlock--points">
                        <span className="SubmissionsBlock--points-label">Your points</span>
                        <div className="SubmissionsBlock--points-bar-wrapper">
                            <div className="SubmissionsBlock--points-bar" style={{ width: barWidth }} />
                            <span className="SubmissionsBlock--points-value">{userPoints}</span>
                        </div>
                    </div>
                    <div className="SubmissionsBlock--section">
                        <div className="SubmissionsBlock--section-header pending">
                            <span className="SubmissionsBlock--section-header-text">
                                Pending review {'(' + pending.length + ')'}
                            </span>
                        </div>
                        <div className="SubmissionsBlock--section-content">{this.renderSubmissions(0, pending)}</div>
                    </div>
                    <div className="SubmissionsBlock--section">
                        <div className="SubmissionsBlock--section-header rejected">
                            <span className="SubmissionsBlock--section-header-text">
                                Rejected {'(' + rejected.length + ')'}
                            </span>
                        </div>
                        <div className="SubmissionsBlock--section-content">{this.renderSubmissions(1, rejected)}</div>
                    </div>
                    <div className="SubmissionsBlock--section">
                        <div className="SubmissionsBlock--section-header half-points">
                            <span className="SubmissionsBlock--section-header-text">
                                Half points {'(' + halfPoints.length + ')'}
                            </span>
                        </div>
                        <div className="SubmissionsBlock--section-content">{this.renderSubmissions(2, halfPoints)}</div>
                    </div>
                    <div className="SubmissionsBlock--section">
                        <div className="SubmissionsBlock--section-header accepted">
                            <span className="SubmissionsBlock--section-header-text">
                                Accepted {'(' + accepted.length + ')'}
                            </span>
                        </div>
                        <div className="SubmissionsBlock--section-content">{this.renderSubmissions(3, accepted)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    submissions: state.user.submissions
});

const mapDispatchToProps = dispatch => ({
    userGetSubmissions: token => dispatch(UserActions.userGetSubmissions(token))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmissionsBlock);
