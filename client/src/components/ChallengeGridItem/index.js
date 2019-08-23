import React from 'react';
import styles from './ChallengeGridItem.module.scss';

import { Rate, Icon, Tag } from 'antd';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import Divider from 'components/Divider';
import { motion } from 'framer-motion';
import DifficultyBadge from 'components/DifficultyBadge';
import CategoryBadge from 'components/CategoryBadge';

const ChallengeGridItem = ({ challenge, onClick }) => {
    return (
        <div className={styles.wrapper} onClick={onClick}>
            <CategoryBadge category={challenge.category} />
            <Divider />
            <h2>{challenge.name}</h2>
            <p>{challenge.shortDescription}</p>
            <DifficultyBadge difficulty={challenge.difficulty} />
        </div>
    );
};

const mapDispatch = (dispatch, ownProps) => ({
    onClick: () => dispatch(push(`/challenges/${ownProps.challenge.contentful_id}`))
});

export default connect(
    null,
    mapDispatch
)(ChallengeGridItem);
