import React from 'react';
import styles from './RelatedChallenges.module.scss';

import { filter } from 'lodash-es';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import * as ContentSelectors from 'redux/content/selectors';
import { challengesPopulated } from '../../redux/content/selectors';

import ChallengeGridItem from 'components/ChallengeGridItem';
import Divider from 'components/Divider';

const shuffleSeed = require('shuffle-seed');
const RelatedChallenges = ({ challenges }) => {
    if (!challenges) return null;
    return (
        <React.Fragment>
            <h2>Similar challenges</h2>
            <Row gutter={16}>
                {challenges.map(challenge => (
                    <Col xs={24} md={12} lg={8} key={challenge._id}>
                        <Divider size={1} />
                        <ChallengeGridItem challenge={challenge} />
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

const mapState = (state, ownProps) => {
    const challenges = ContentSelectors.challengesPopulated(state);
    const sameCategory = filter(
        challenges,
        c => c._id !== ownProps.challengeId && c.category.contentful_id === ownProps.category
    );

    return {
        challenges: shuffleSeed.shuffle(sameCategory, ownProps.challengeId).slice(0, 3)
    };
};

export default connect(mapState)(RelatedChallenges);
