import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.css';
import Sort from './sort';

class SortOptions extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                name: PropTypes.string,
                sort: PropTypes.func
            })
        ),
        selectedSort: PropTypes.shape({
            key: PropTypes.string,
            name: PropTypes.string,
            sort: PropTypes.func
        }),
        onChange: PropTypes.func
    };

    static defaultProps = {
        options: Sort.Options,
        selectedSort: Sort.Default
    };

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    handleChange(option) {
        if (this.props.selectedSort.key === option.key) {
            return;
        }

        this.props.onChange(option);
        this.setState({ expanded: false });
    }

    renderOptions() {
        return _.map(this.props.options, sortOption => {
            const className =
                this.props.selectedSort.key === sortOption.key ? 'SortOptions--item selected' : 'SortOptions--item';

            return (
                <div key={sortOption.key} className={className} onClick={() => this.handleChange(sortOption)}>
                    <span className="SortOptions--item-name">{sortOption.name}</span>
                </div>
            );
        });
    }

    render() {
        const className = this.state.expanded
            ? 'DifficultyFilters--filters behind-2 visible'
            : 'DifficultyFilters--filters behind-2';
        const iconClass = this.state.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        const headerText = this.props.selectedSort ? 'Sort: ' + this.props.selectedSort.name : 'Sort: Default';

        return (
            <div className="DifficultyFilters">
                <div
                    className="DifficultyFilters--header"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <span>{headerText}</span>
                    <i className={iconClass} />
                </div>
                <div className="DifficultyFilters--filters-wrapper behind-2">
                    <div className={className}>{this.renderOptions()}</div>
                </div>
            </div>
        );
    }
}

export default SortOptions;
