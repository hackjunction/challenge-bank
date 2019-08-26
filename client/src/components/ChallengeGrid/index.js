import React from 'react';
import styles from './style.module.scss';

import { connect } from 'react-redux';
import { Row, Col, Empty } from 'antd';

import ChallengeGridItem from 'components/ChallengeGridItem';
import Divider from 'components/Divider';
import AnimatedList from 'components/AnimatedList';

import * as ContentSelectors from 'redux/content/selectors';

const ChallengeGrid = ({ challenges, categoriesMap, difficultiesMap }) => {
    const count = challenges.length;

    const renderColumn = challenges => {
        return challenges.map(challenge => (
            <React.Fragment key={challenge._id}>
                <Divider size={1} />
                <ChallengeGridItem challenge={challenge} />
            </React.Fragment>
        ));
    };
    return (
        <Row gutter={16}>
            <Col xs={24}>
                {challenges.length === 0 && (
                    <div className={styles.emptyWrapper}>
                        <Empty />
                    </div>
                )}
            </Col>
            <Col xs={24} md={12} lg={8}>
                {renderColumn(challenges.slice(0, count / 3))}
            </Col>
            <Col xs={24} md={12} lg={8}>
                {renderColumn(challenges.slice(count / 3, (count * 2) / 3))}
            </Col>
            <Col xs={24} lg={8}>
                {renderColumn(challenges.slice((count * 2) / 3))}
            </Col>
        </Row>
    );
};

const mapState = state => ({
    challenges: ContentSelectors.challengesPopulatedFiltered(state),
    categoriesMap: ContentSelectors.categoriesMap(state),
    difficultiesMap: ContentSelectors.difficultiesMap(state)
});

export default connect(mapState)(ChallengeGrid);
