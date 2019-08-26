import React, { useState } from 'react';
import styles from './ChallengeGridFilters.module.scss';

import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';

import Divider from 'components/Divider';
import FilterDropdown from 'components/FilterDropdown';

import * as ContentSelectors from 'redux/content/selectors';
import * as FilterSelectors from 'redux/filters/selectors';
import * as FilterActions from 'redux/filters/actions';

const ChallengeGridFilters = ({
    allCategories,
    selectedCategories,
    setSelectedCategories,
    allDifficulties,
    selectedDifficulties,
    setSelectedDifficulties,
    clearFilters
}) => {
    const [activeFilter, setActiveFilter] = useState();
    return (
        <Row gutter={16} type="flex">
            <Col xs={24} md={12} order={2}>
                <Divider size={1} />
                <FilterDropdown
                    active={activeFilter === 'category'}
                    toggleActive={
                        activeFilter === 'category'
                            ? () => setActiveFilter(undefined)
                            : () => setActiveFilter('category')
                    }
                    items={allCategories}
                    selectedItems={selectedCategories}
                    onSelectedChange={setSelectedCategories}
                    label="Filter by category"
                    labelField="name"
                    colorField="color"
                    idField="contentful_id"
                />
            </Col>
            <Col xs={24} md={12} order={1}>
                <Divider size={1} />
                <FilterDropdown
                    active={activeFilter === 'difficulty'}
                    toggleActive={
                        activeFilter === 'difficulty'
                            ? () => setActiveFilter(undefined)
                            : () => setActiveFilter('difficulty')
                    }
                    items={allDifficulties}
                    selectedItems={selectedDifficulties}
                    onSelectedChange={setSelectedDifficulties}
                    label="Filter by difficulty"
                    labelField="name"
                    descriptionField="description"
                    idField="contentful_id"
                />
            </Col>
            <Col xs={24} order={3}>
                <Button type="link" onClick={clearFilters}>
                    Clear filters
                </Button>
            </Col>
        </Row>
    );
};

const mapState = state => ({
    allCategories: ContentSelectors.categoriesSorted(state),
    selectedCategories: FilterSelectors.selectedCategories(state),
    allDifficulties: ContentSelectors.difficultiesSorted(state),
    selectedDifficulties: FilterSelectors.selectedDifficulties(state)
});

const mapDispatch = dispatch => ({
    setSelectedCategories: items => dispatch(FilterActions.setSelectedCategories(items)),
    setSelectedDifficulties: items => dispatch(FilterActions.setSelectedDifficulties(items)),
    clearFilters: () => dispatch(FilterActions.clearFilters())
});

export default connect(
    mapState,
    mapDispatch
)(ChallengeGridFilters);
