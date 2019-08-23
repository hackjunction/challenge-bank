import React from 'react';
import styles from './style.module.scss';

const CenteredContainer = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>{children}</div>
        </div>
    );
};

export default CenteredContainer;
