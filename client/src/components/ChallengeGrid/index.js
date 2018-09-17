import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Points from '../../constants/points';

class ChallengeGrid extends Component {
    static propTypes = {
        challenges: PropTypes.array,
        showEmptyText: PropTypes.bool
    };

    render() {
        console.log(this.props.showEmptyText);
        if (!this.props.challenges || this.props.challenges.length === 0) {
            if (this.props.showEmptyText) {
                console.log('SHOWING EMPTY');
                return (
                    <div className="row">
                        <h3>No challenges match those filters...</h3>
                    </div>
                );
            } else {
                return null;
            }
        }

        return (
            <div className="row">
                <p>Showing {this.props.challenges.length} challenges</p>
                <div className="grid">
                    {_.map(this.props.challenges, challenge => (
                        <div className="grid-item" key={`challenge-${challenge.id}`}>
                            <div className="grid-content">
                                <div className="flexrow">
                                    <p
                                        className="category"
                                        style={{
                                            color: `rgba(${Object.values(
                                                JSON.parse(challenge.challengeCategory.color)
                                            ).join(',')})`
                                        }}
                                    >
                                        <b>{challenge.challengeCategory.name}</b>
                                    </p>
                                    <p className="difficulty">{challenge.challengeDifficulty.name}</p>
                                </div>
                                <h5>{challenge.name}</h5>
                                <p>{challenge.shortDescription}</p>
                            </div>
                            <div className="flexrow">
                                <Link to={`/challenge/${challenge.id}`} className="grid-link">
                                    See Details >
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ChallengeGrid;
