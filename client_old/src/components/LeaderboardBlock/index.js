import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.css';

class LeaderboardBlock extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
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
        limit: 30,
        isSelf: () => false
    };

    renderHeaders() {
        const cols = _.map(this.props.columns, (column, idx) => {
            const style = idx === this.props.columns.length - 1 ? { 'text-align': 'right' } : {};
            return (
                <th key={column.key} style={style} scope="col">
                    {column.name}
                </th>
            );
        });

        cols.push(<th key="star" />);

        return cols;
    }

    renderRows() {
        return _.map(this.props.items.slice(0, this.props.limit), (item, index) => {
            const cols = _.map(this.props.columns, (col, idx) => {
                const style = idx === this.props.columns.length - 1 ? { 'text-align': 'right' } : {};

                return (
                    <td key={col.key} style={style}>
                        {col.getValue(item, index)}
                    </td>
                );
            });

            if (this.props.isSelf(item)) {
                cols.push(
                    <td key="star" style={{ 'text-align': 'right' }}>
                        <i class="fas fa-star" style={{ color: 'gold' }} />
                    </td>
                );
            } else {
                cols.push(<td style={{ 'text-align': 'right' }} key="star" />);
            }

            return <tr>{cols}</tr>;
        });
    }

    render() {
        return (
            <div className="LeaderboardBlock">
                <h3 className="LeaderboardBlock--title">{this.props.title}</h3>
                {this.props.description ? (
                    <p className="LeaderboardBlock--description">{this.props.description}</p>
                ) : null}
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
