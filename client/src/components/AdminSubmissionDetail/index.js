import React, { useState } from 'react';
import styles from './AdminSubmissionDetail.module.scss';

import { Descriptions, Input, Button, notification } from 'antd';
import { connect } from 'react-redux';

import Divider from 'components/Divider';
import * as ContentSelectors from 'redux/content/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import SubmissionsService from 'services/submissions';

const AdminSubmissionDetail = ({ submission, difficultiesMap, categoriesMap, token, onDone }) => {
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState('');

    const handleSubmit = status => {
        setLoading(true);
        SubmissionsService.reviewSubmission(token, submission._id, status, feedback)
            .then(submission => {
                notification.success({
                    message: 'Review saved!'
                });
                onDone();
            })
            .catch(err => {
                notification.error({
                    message: 'Something went wrong',
                    description: 'Your review was not saved'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={styles.wrapper}>
            <Descriptions title="Challenge details" layout="vertical" column={1}>
                <Descriptions.Item label="Challenge">{submission.challenge.name}</Descriptions.Item>
                <Descriptions.Item label="Challenge description">{submission.challenge.description}</Descriptions.Item>
                <Descriptions.Item label="Submission instructions">
                    {submission.challenge.submissionInstructions}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title="Example solution" layout="vertical" />
            {submission.challenge.exampleSolution ? (
                <p>{submission.challenge.exampleSolution}</p>
            ) : (
                <p>This challenge has no example solution</p>
            )}
            <Descriptions title="Grading instructions" layout="vertical" />
            {submission.challenge.hasExactAnswer ? (
                <p>This challenge is automatically graded, and the correct answer is {submission.challenge.answer}</p>
            ) : (
                <p>{submission.challenge.gradingInstructions}</p>
            )}
            <Descriptions title="User answered:" layout="vertical" />
            <p>{submission.answer}</p>
            <Descriptions title="Review"></Descriptions>
            <div className={styles.actions}>
                <Input.TextArea
                    placeholder="Type some feedback here (will be shown to the user)"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                />
                <Divider size={1} />
                <div className={styles.buttons}>
                    <Button type="danger" onClick={() => handleSubmit(3)}>
                        Reject
                    </Button>
                    <Divider size={1} />
                    <Button type="primary" onClick={() => handleSubmit(1)}>
                        Accept (50% points)
                    </Button>
                    <Divider size={1} />
                    <Button type="primary" onClick={() => handleSubmit(2)}>
                        Accept (Full points)
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapState = state => ({
    difficultiesMap: ContentSelectors.difficultiesMap(state),
    categoriesMap: ContentSelectors.categoriesMap(state),
    token: AuthSelectors.token(state)
});

export default connect(mapState)(AdminSubmissionDetail);
