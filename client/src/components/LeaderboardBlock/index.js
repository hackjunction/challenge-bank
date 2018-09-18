import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.css';

class LeaderboardBlock extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        getItemKey: PropTypes.func,
        getItemName: PropTypes.func,
        getItemScore: PropTypes.func,
        limit: PropTypes.number
    };

    static defaultProps = {
        limit: 10
    };

    renderList() {
        return _.map(this.props.items.slice(0, this.props.limit), (item, index) => {
            return (
                <div key={this.props.getItemKey(item)} className="LeaderboardBlock--list-item">
                    <span className="LeaderboardBlock--list-item-rank">{index + 1}</span>
                    <span className="LeaderboardBlock--list-item-name">{this.props.getItemName(item)}</span>
                    <span className="LeaderboardBlock--list-item-score">{this.props.getItemScore(item)}</span>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="LeaderboardBlock">
                <h3 className="LeaderboardBlock--title">{this.props.title}</h3>
                <div className="LeaderboardBlock--list">{this.renderList()}</div>
            </div>
        );
    }
}

export default LeaderboardBlock;
