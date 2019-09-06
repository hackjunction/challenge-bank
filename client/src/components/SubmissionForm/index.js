import React, { useState, useEffect } from 'react';
import styles from './SubmissionForm.module.scss';

import { findIndex, filter } from 'lodash-es';
import { connect } from 'react-redux';
import { Input, Button, Alert } from 'antd';
import Divider from 'components/Divider';
import * as AuthSelectors from 'redux/auth/selectors';
import * as SubmissionsSelectors from 'redux/submissions/selectors';

const SubmissionForm = ({ hasPendingSubmission, hasAcceptedSubmission, submissionCount, onSubmit, user }) => {
    const [answer, setAnswer] = useState();

    const renderStatus = () => {
        if (hasPendingSubmission) {
            return <Alert message="You have a submission pending review. Check back soon!" type="info" showIcon />;
        }
        if (hasAcceptedSubmission) {
            return <Alert message="You've been awarded full points for this challenge!" type="success" showIcon />;
        }
        if (submissionCount > 0 && submissionCount < 5) {
            return <Alert message={`You have ${5 - submissionCount} submissions left for this challenge`} type="warning" showIcon />;
        }

        if (submissionCount >= 5) {
            return <Alert message="You have reached the maximum amount of submissions for this challenge" type="error" showIcon />;
        }
    };

    useEffect(() => {
        setAnswer('');
    }, [hasPendingSubmission, hasAcceptedSubmission]);

    const disabled = hasPendingSubmission || hasAcceptedSubmission || submissionCount >= 5;

    return (
        <div className={styles.wrapper}>
            {renderStatus()}
            <Divider size={1} />
            <div className={styles.form}>
                <Input
                    size="large"
                    placeholder="Enter your answer here"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    disabled={disabled}
                />
                <Divider />
                <Button size="large" type="primary" disabled={!answer} onClick={() => onSubmit(answer)}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

const mapState = (state, ownProps) => {
    let submissions = SubmissionsSelectors.submissionsByDate(state);

    const hasPendingSubmission =
        findIndex(submissions, s => s.challenge === ownProps.challengeId && s.reviewStatus === 0) !== -1;
    const hasAcceptedSubmission =
        findIndex(submissions, s => s.challenge === ownProps.challengeId && s.reviewStatus === 2) !== -1;
    const submissionCount = filter(submissions, s => s.challenge === ownProps.challengeId).length;
    const user = AuthSelectors.userPopulated(state);

    return {
        hasPendingSubmission,
        hasAcceptedSubmission,
        submissionCount,
        user
    };
};

export default connect(mapState)(SubmissionForm);
