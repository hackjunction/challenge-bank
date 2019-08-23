import React from 'react';
import styles from './Challenge.module.scss';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import * as ContentSelectors from 'redux/content/selectors';

import Markdown from 'components/Markdown';
import CenteredContainer from 'components/CenteredContainer';
import Divider from 'components/Divider';
import CategoryBadge from 'components/CategoryBadge';
import DifficultyBadge from 'components/DifficultyBadge';
import RelatedChallenges from 'components/RelatedChallenges';

const ChallengePage = ({ challenge }) => {
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
            <div className={styles.submit}>
                <Input size="large" placeholder="Your answer here" />
                <Divider />
                <Button size="large" type="primary">
                    Submit
                </Button>
            </div>
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
        challenge: challengesMap[challengeId]
    };
};

export default connect(mapState)(ChallengePage);
