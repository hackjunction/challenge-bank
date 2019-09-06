import React, { useState, useCallback } from 'react';
import styles from './Challenge.module.scss';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button, notification } from 'antd';
import * as ContentSelectors from 'redux/content/selectors';
import * as SubmissionsActions from 'redux/submissions/actions';

import Markdown from 'components/Markdown';
import CenteredContainer from 'components/CenteredContainer';
import Divider from 'components/Divider';
import CategoryBadge from 'components/CategoryBadge';
import DifficultyBadge from 'components/DifficultyBadge';
import RelatedChallenges from 'components/RelatedChallenges';
import SubmissionsTable from 'components/SubmissionsTable';
import SubmissionForm from 'components/SubmissionForm';

import SubmissionsService from 'services/submissions';

const ChallengePage = ({ challenge, createSubmission, challengeId }) => {
    const handleSubmit = useCallback(answer => {
        createSubmission(answer)
            .then(() => {
                notification.success({
                    message: 'Submission successful!',
                    description: 'Your submission will be reviewed as soon as possible'
                });
            })
            .catch(err => {
                notification.error({
                    message: 'Submission failed',
                    description: err
                });
            });
    });

    return (
        <CenteredContainer>
            <Divider size={2} />
            <Link to="/challenges">Back to challenges</Link>
            <h1 className={styles.title}>{challenge.name}</h1>
            <div className={styles.challenge}>
                <div className={styles.row}>
                    <CategoryBadge category={challenge.category} />
                    <Divider />
                    <DifficultyBadge difficulty={challenge.difficulty} />
                </div>
                <Divider />
                <Markdown source={challenge.description} />
                {challenge.exampleSolution && (
                    <React.Fragment>
                        <h3>Example solution</h3>
                        <Markdown source={challenge.exampleSolution} />
                    </React.Fragment>
                )}
                <Divider size={2} />
                <h3>Submission instructions</h3>
                <Markdown source={challenge.submissionInstructions} />
            </div>
            <Divider />
            <SubmissionForm challengeId={challengeId} onSubmit={handleSubmit} />
            <SubmissionsTable challengeId={challengeId} />
            <Divider size={5} />
            <RelatedChallenges category={challenge.category.contentful_id} challengeId={challenge._id} />
            <Divider size={2} />
        </CenteredContainer>
    );
};

const mapState = (state, ownProps) => {
    const challengesMap = ContentSelectors.challengesMapPopulated(state);
    const challengeId = ownProps.match.params.id;
    return {
        challenge: challengesMap[challengeId],
        challengeId
    };
};

const mapDispatch = (dispatch, ownProps) => ({
    createSubmission: answer => dispatch(SubmissionsActions.createSubmission(ownProps.match.params.id, answer))
});

export default connect(
    mapState,
    mapDispatch
)(ChallengePage);
