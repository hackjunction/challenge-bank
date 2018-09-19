import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.css';

class LeaderboardBlock extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        isSelf: PropTypes.func,
        limit: PropTypes.number,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                key: PropTypes.string,
                getValue: PropTypes.func
            })
        )
    };

    static defaultProps = {
        limit: 10,
        isSelf: () => false
    };

    renderHeaders() {
        return _.map(this.props.columns, column => {
            return (
                <th key={column.key} scope="col">
                    {column.name}
                </th>
            );
        });
    }

    renderRows() {
        return _.map(this.props.items.slice(0, this.props.limit), (item, index) => {
            const cols = _.map(this.props.columns, col => {
                return <td key={col.key}>{col.getValue(item, index)}</td>;
            });

            return <tr>{cols}</tr>;
        });
    }

    render() {
        return (
            <div className="LeaderboardBlock">
                <h3 className="LeaderboardBlock--title">{this.props.title}</h3>
                <table class="table">
                    <thead>
                        <tr>{this.renderHeaders()}</tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
            </div>
        );
    }
}

export default LeaderboardBlock;
