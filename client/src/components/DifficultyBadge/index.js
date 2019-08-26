import React from 'react';
import styles from './DifficultyBadge.module.scss';

import { Rate, Icon } from 'antd';

import Divider from 'components/Divider';

const DifficultyBadge = ({ difficulty }) => {
    if (!difficulty) return null;
    return (
        <div className={styles.wrapper}>
            <Rate
                disabled
                character={<Icon type="fire" theme="filled" />}
                value={difficulty.value}
                count={difficulty.value}
            />
            <Divider />
            <span className={styles.label}>
                {difficulty.name} ({difficulty.pointValue}pts)
            </span>
        </div>
    );
};

export default DifficultyBadge;
