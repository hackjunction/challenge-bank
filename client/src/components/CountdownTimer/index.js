import React from 'react';
import styles from './CountdownTimer.module.scss';

const CountdownTimer = ({ label, hours, minutes, seconds }) => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <div className={styles.numbers}>
                <span className={styles.number}>{hours}</span>
                <span className={styles.number}>:</span>
                <span className={styles.number}>{minutes}</span>
                <span className={styles.number}>:</span>
                <span className={styles.number}>{seconds}</span>
            </div>
        </div>
    );
};

export default CountdownTimer;
