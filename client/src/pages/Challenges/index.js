import React from 'react';
import styles from './Challenges.module.scss';

import ChallengeGrid from 'components/ChallengeGrid';
import CenteredContainer from 'components/CenteredContainer';
import Divider from 'components/Divider';

const Challenges = () => {
    return (
        <CenteredContainer>
            <Divider size={2} />
            <h1 className={styles.title}>The challenges</h1>
            <ChallengeGrid />
            <Divider size={2} />
        </CenteredContainer>
    );
};

export default Challenges;
