import React, { useState, useCallback } from 'react';
import styles from './FilterDropdown.module.scss';

import { connect } from 'react-redux';
import { Icon, Badge } from 'antd';
import classNames from 'classnames';

import * as ContentSelectors from 'redux/content/selectors';

const FilterDropdown = ({
    active,
    toggleActive,
    items,
    selectedItems,
    onSelectedChange,
    label,
    labelField,
    colorField,
    descriptionField,
    idField
}) => {
    const toggleSelected = item => {
        const id = item[idField];
        if (selectedItems.indexOf(id) !== -1) {
            onSelectedChange(selectedItems.filter(item => item !== id));
        } else {
            onSelectedChange(selectedItems.concat(id));
        }
    };

    const isSelected = item => {
        return selectedItems.indexOf(item[idField]) !== -1;
    };

    const renderItem = item => {
        return (
            <div
                key={item[idField]}
                onClick={() => toggleSelected(item)}
                className={classNames(styles.menuItem, { [styles.selected]: isSelected(item) })}
            >
                <div className={styles.menuItemTop}>
                    <span className={styles.menuItemLabel}>
                        {colorField && <Badge className={styles.menuItemColor} color={item[colorField]} />}
                        {item[labelField]}
                    </span>
                    <Icon className={styles.menuItemCheck} type="check" />
                </div>
                {descriptionField && <span className={styles.menuItemBottom}>{item[descriptionField]}</span>}
            </div>
        );
    };

    const renderCount = () => {
        if (selectedItems.length === 0) {
            return '(All)';
        } else {
            return `(${selectedItems.length}/${items.length})`;
        }
    };

    return (
        <div className={classNames(styles.wrapper, { [styles.active]: active })}>
            <div className={styles.top} onClick={toggleActive}>
                <span className={styles.title}>
                    {label} {renderCount()}
                </span>
                <Icon className={styles.icon} type="caret-right" />
            </div>
            <div className={styles.menu}>{items.map(renderItem)}</div>
        </div>
    );
};

export default FilterDropdown;
