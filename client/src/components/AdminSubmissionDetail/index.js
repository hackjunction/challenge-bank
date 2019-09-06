import React, { useState, useEffect } from 'react';
import styles from './AdminSubmissionDetail.module.scss';

import { Descriptions, Input, Button, notification, Divider as AntDivider } from 'antd';
import { connect } from 'react-redux';
import { Typography } from 'antd';

import Divider from 'components/Divider';
import * as ContentSelectors from 'redux/content/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import SubmissionsService from 'services/submissions';

const { Paragraph } = Typography;

const AdminSubmissionDetail = ({ submission, difficultiesMap, categoriesMap, token, onDone }) => {
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        setFeedback('');
    }, [submission._id]);

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
            <AntDivider>Challenge details</AntDivider>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Challenge">{submission.challenge.name}</Descriptions.Item>
                <Descriptions.Item label="Challenge description">{submission.challenge.description}</Descriptions.Item>
                <Descriptions.Item label="Submission instructions">
                    {submission.challenge.submissionInstructions}
                </Descriptions.Item>
                <Descriptions.Item label="Example solution">
                    {submission.challenge.exampleSolution ? (
                        <p>{submission.challenge.exampleSolution}</p>
                    ) : (
                        <p>No example solution</p>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Grading instructions">
                    {submission.challenge.hasExactAnswer ? (
                        <p>
                            This challenge is automatically graded, and the correct answer is{' '}
                            {submission.challenge.answer}
                        </p>
                    ) : (
                        <p>{submission.challenge.gradingInstructions || 'No grading instructions'}</p>
                    )}
                </Descriptions.Item>
            </Descriptions>
            <Divider size={1} />
            <Descriptions bordered column={1}>
                <Descriptions.Item label="User answered">
                    <Paragraph copyable>{submission.answer}</Paragraph>
                </Descriptions.Item>
            </Descriptions>
            <AntDivider>Review</AntDivider>
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
