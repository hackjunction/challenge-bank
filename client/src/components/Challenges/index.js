import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ClipLoader, BarLoader } from 'react-spinners';
import _ from 'lodash';
import './style.css';
import { connect } from 'react-redux';
import * as SubmissionsActions from '../../actions/submissions';
import * as Review from '../../constants/review';

import DifficultyFilters from '../DifficultyFilters/';
import CategoryFilters from '../CategoryFilters/';
import ChallengeGrid from '../ChallengeGrid/';
import SubmissionsBlock from '../SubmissionsBlock/';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulties: [],
            categories: [],
            selectedDifficulties: [],
            selectedCategories: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.allChallenges !== this.props.data.allChallenges) {
            const newState = {};
            const { categories, difficulties } = this.getDifficultiesAndCategories(nextProps.data.allChallenges);
            newState.categories = categories;
            newState.difficulties = difficulties;
            if (!this.props.data.allChallenges && nextProps.data.allChallenges) {
                newState.selectedDifficulties = difficulties;
                newState.selectedCategories = categories;
            }

            this.setState(newState);
        }
    }

    getDifficultiesAndCategories(challenges) {
        const difficulties = [];
        const categories = [];

        _.each(challenges, challenge => {
            if (challenge.challengeDifficulty) {
                if (_.findIndex(difficulties, o => o.name === challenge.challengeDifficulty.name) === -1) {
                    difficulties.push(challenge.challengeDifficulty);
                }
            }

            if (challenge.challengeCategory) {
                if (_.findIndex(categories, o => o.name === challenge.challengeCategory.name) === -1) {
                    categories.push(challenge.challengeCategory);
                }
            }
        });

        return {
            difficulties,
            categories
        };
    }

    filterChallenges() {
        return _.filter(this.props.data.allChallenges, challenge => {
            if (!challenge.challengeDifficulty || !challenge.challengeCategory) {
                return false;
            }

            const catName = challenge.challengeCategory.name;
            const diffName = challenge.challengeDifficulty.name;

            if (_.findIndex(this.state.selectedCategories, c => c.name === catName) !== -1) {
                if (_.findIndex(this.state.selectedDifficulties, d => d.name === diffName) !== -1) {
                    return true;
                }
            }

            return false;
        });
    }

    renderLoading() {
        return (
            <div className="loader">
                <ClipLoader sizeUnit={'px'} size={80} color={'black'} />
                <p>Loading Challenges...</p>
            </div>
        );
    }

    renderError() {
        return (
            <div className="error">
                <h2>Something went wrong while fetching the challenges</h2>
                <p>
                    <Link to="/challenges" onClick={() => window.location.reload()} className="errorLink">
                        Try Again
                    </Link>
                    or maybe go back to
                    <Link to="/" className="errorLink">
                        Home Page
                    </Link>
                </p>
            </div>
        );
    }

    render() {
        const { error, loading } = this.props.data;
        if (error) return this.renderError();
        if (loading) return this.renderLoading();

        return (
            <div className="container">
                <div className="Challenges--submissions-wrapper">
                    <SubmissionsBlock challenges={this.props.data.allChallenges} />
                </div>
                <div className="Challenges--filters-wrapper">
                    <DifficultyFilters
                        difficulties={this.state.difficulties}
                        selectedDifficulties={this.state.selectedDifficulties}
                        onChange={selectedDifficulties => this.setState({ selectedDifficulties })}
                    />
                    <CategoryFilters
                        categories={this.state.categories}
                        selectedCategories={this.state.selectedCategories}
                        onChange={selectedCategories => this.setState({ selectedCategories })}
                    />
                </div>
                <div className="Challenges--challenges-wrapper col-xs-12">
                    <ChallengeGrid challenges={this.filterChallenges()} showEmptyText={true} />
                </div>
            </div>
        );
    }
}

export const allChallenges = gql`
    query allChallenges {
        allChallenges(filter: { isPublished: true }) {
            id
            name
            shortDescription
            challengeCategory {
                color
                name
            }
            challengeDifficulty {
                name
                difficultyvalue
            }
            isPublished
        }
        _allChallengesMeta {
            count
        }
    }
`;

export default graphql(allChallenges)(Home);
