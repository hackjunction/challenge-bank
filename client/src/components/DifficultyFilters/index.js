import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import Points from '../../constants/points';
import './style.css';

class DifficultyFilters extends Component {
    static propTypes = {
        difficulties: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                difficultyvalue: PropTypes.number
            })
        ),
        selectedDifficulties: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                difficultyvalue: PropTypes.number
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
        this.props.onChange(this.props.difficulties);
    }

    clearAll() {
        this.props.onChange([]);
    }

    handleChange(difficulty, event) {
        if (event.target.checked) {
            const newSelected = _.concat(this.props.selectedDifficulties, difficulty);
            this.props.onChange(newSelected);
        } else {
            const newSelected = _.filter(this.props.selectedDifficulties, d => d.name !== difficulty.name);
            this.props.onChange(newSelected);
        }
    }

    renderDifficulties() {
        const sorted = _.sortBy(this.props.difficulties, 'difficultyvalue');

        return _.map(sorted, difficulty => {
            const isChecked = _.findIndex(this.props.selectedDifficulties, d => d.name === difficulty.name) !== -1;

            return (
                <div key={difficulty.name} className="DifficultyFilters--filter">
                    <span className="DifficultyFilters--filter-name">
                        {difficulty.name + ' (' + Points[difficulty.difficultyvalue] + 'p)'}{' '}
                    </span>
                    <Switch
                        onChange={event => this.handleChange(difficulty, event)}
                        checked={isChecked}
                        value={difficulty.name}
                        color="primary"
                    />
                </div>
            );
        });
    }

    render() {
        const className = this.state.expanded ? 'DifficultyFilters--filters visible' : 'DifficultyFilters--filters';
        const iconClass = this.state.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        const headerText =
            'Filter by difficulty (' +
            this.props.selectedDifficulties.length +
            '/' +
            this.props.difficulties.length +
            ')';

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
                        {this.renderDifficulties()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DifficultyFilters;
