import React, { useEffect } from 'react';
import styles from './SubmissionsTable.module.scss';

import { connect } from 'react-redux';
import { Table, Collapse } from 'antd';
import { filter } from 'lodash-es';
import moment from 'moment';

import SubmissionsService from 'services/submissions';

import StatusBadge from 'components/StatusBadge';

import * as SubmissionsSelectors from 'redux/submissions/selectors';
import * as SubmissionsActions from 'redux/submissions/actions';
import * as ContentSelectors from 'redux/content/selectors';

const SubmissionsTable = ({ updateSubmissions, submissions, challenges, title }) => {
    useEffect(() => {
        updateSubmissions();
    }, []);

    const getChallengeName = challengeId => {
        if (challenges.hasOwnProperty(challengeId)) {
            return challenges[challengeId].name;
        } else {
            return '???';
        }
    };

    const formatAnswer = answer => {
        if (answer.length > 100) {
            return answer.slice(0, 100) + '...';
        }
        return answer;
    };

    const formatDate = date => {
        return moment(date).fromNow();
    };

    const getPointsForStatus = (status, challengeId) => {
        const challenge = challenges[challengeId];
        const points = challenge.difficulty.pointValue;

        switch (status) {
            case 0:
                return 0;
            case 1:
                return points * 0.5;
            case 2:
                return points;
            case 3:
                return 0;
            default:
                return 0;
        }
    };

    const formatPoints = (status, record) => {
        return getPointsForStatus(status, record.challenge);
    };

    const renderFooter = () => {
        const totalPoints = submissions.reduce((sum, submission) => {
            return sum + getPointsForStatus(submission.reviewStatus, submission.challenge);
        }, 0);
        return 'Total points: ' + totalPoints;
    };

    return (
        <div className={styles.wrapper}>
            <Collapse bordered={false}>
                <Collapse.Panel header={`${title} (${submissions.length})`} key="1">
                    <Table
                        dataSource={submissions}
                        pagination={false}
                        rowKey="_id"
                        footer={renderFooter}
                        expandedRowRender={submission => {
                            if (submission.reviewFeedback) {
                                return (
                                    <div>
                                        <strong>Feedback</strong>
                                        <p>{submission.reviewFeedback}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div>
                                        <strong>Feedback</strong>
                                        <p>No feedback yet from the reviewers :(</p>
                                    </div>
                                );
                            }
                        }}
                    >
                        <Table.Column
                            title="Challenge"
                            dataIndex="challenge"
                            key="challenge"
                            render={getChallengeName}
                        />
                        <Table.Column title="Answer" dataIndex="answer" key="answer" render={formatAnswer} />
                        <Table.Column title="Time" dataIndex="createdAt" key="createdAt" render={formatDate} />
                        <Table.Column
                            title="Status"
                            dataIndex="reviewStatus"
                            key="reviewStatus"
                            render={status => <StatusBadge status={status} />}
                        />
                        <Table.Column title="Points" dataIndex="reviewStatus" key="points" render={formatPoints} />
                    </Table>
                </Collapse.Panel>
            </Collapse>
        </div>
    );
};

const mapState = (state, ownProps) => {
    let submissions = SubmissionsSelectors.submissionsByDate(state);
    let title = 'Your submissions';
    if (ownProps.challengeId) {
        submissions = filter(submissions, sub => sub.challenge === ownProps.challengeId);
        title = 'Your submissions for this challenge';
    }

    return {
        submissions,
        title,
        challenges: ContentSelectors.challengesMapPopulated(state)
    };
};

const mapDispatch = dispatch => ({
    updateSubmissions: () => dispatch(SubmissionsActions.updateSubmissions())
});

export default connect(
    mapState,
    mapDispatch
)(SubmissionsTable);
