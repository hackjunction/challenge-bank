import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import './style.css';

class CategoryFilters extends Component {
    static propTypes = {
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                color: PropTypes.string
            })
        ),
        selectedCategories: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                color: PropTypes.string
            })
        ),
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.selectAll = this.selectAll.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    selectAll() {
        this.props.onChange(this.props.categories);
    }

    clearAll() {
        this.props.onChange([]);
    }

    handleChange(category, event) {
        if (event.target.checked) {
            const newSelected = _.concat(this.props.selectedCategories, category);
            this.props.onChange(newSelected);
        } else {
            const newSelected = _.filter(this.props.selectedCategories, c => c.name !== category.name);
            this.props.onChange(newSelected);
        }
    }

    renderCategories() {
        return _.map(this.props.categories, category => {
            const isChecked = _.findIndex(this.props.selectedCategories, c => c.name === category.name) !== -1;

            return (
                <div key={category.name} className="DifficultyFilters--filter">
                    <span className="DifficultyFilters--filter-name">{category.name}</span>
                    <Switch
                        onChange={event => this.handleChange(category, event)}
                        checked={isChecked}
                        value={category.name}
                    />
                </div>
            );
        });
    }

    render() {
        const className = this.state.expanded
            ? 'DifficultyFilters--filters behind-1 visible'
            : 'DifficultyFilters--filters behind-1';
        const iconClass = this.state.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        const headerText =
            'Filter by category (' + this.props.selectedCategories.length + '/' + this.props.categories.length + ')';

        return (
            <div className="DifficultyFilters">
                <div
                    className="DifficultyFilters--header"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <span>{headerText}</span>
                    <i className={iconClass} />
                </div>
                <div className="DifficultyFilters--filters-wrapper">
                    <div className={className}>
                        <div className="DifficultyFilters--select-all-wrapper">
                            <span className="DifficultyFilters--select-all-btn" onClick={this.selectAll}>
                                Select all
                            </span>
                            <span className="DifficultyFilters--select-all-btn" onClick={this.clearAll}>
                                Clear
                            </span>
                        </div>
                        {this.renderCategories()}
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryFilters;
