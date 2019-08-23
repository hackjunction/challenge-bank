import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ClipLoader, BarLoader } from 'react-spinners';
import _ from 'lodash';
import './style.css';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';

import * as UserActions from '../../actions/user';

import DifficultyFilters from '../DifficultyFilters';
import CategoryFilters from '../CategoryFilters';
import SortOptions from '../SortOptions';
import ChallengeGrid from '../ChallengeGrid';
import SubmissionsBlock from '../SubmissionsBlock';
import EventTimer from '../EventTimer';

class Home extends Component {
    componentWillMount() {
        this.props.updateUserWithToken(this.props.user.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.allChallenges !== this.props.data.allChallenges) {
            const { categories, difficulties } = this.getDifficultiesAndCategories(nextProps.data.allChallenges);

            this.props.setAvailableCategoryFilters(categories);
            this.props.setAvailableDifficultyFilters(difficulties);

            if (!this.props.data.allChallenges && nextProps.data.allChallenges) {
                this.props.setSelectedCategoryFilters(categories);
                this.props.setSelectedDifficultyFilters(difficulties);
            }
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
        const submittedIds = _.map(this.props.submissions, 'challengeId');
        return _.filter(this.props.data.allChallenges, challenge => {
            if (!challenge.challengeDifficulty || !challenge.challengeCategory) {
                return false;
            }

            if (this.props.hideSubmitted) {
                if (submittedIds.indexOf(challenge.id) !== -1) {
                    return false;
                }
            }

            if (challenge.techRaceOnly && !this.props.user.event.isTechRace) {
                return false;
            }

            const catName = challenge.challengeCategory.name;
            const diffName = challenge.challengeDifficulty.name;

            if (_.findIndex(this.props.categoryFilters.selected, c => c.name === catName) !== -1) {
                if (_.findIndex(this.props.difficultyFilters.selected, d => d.name === diffName) !== -1) {
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

        let challenges = this.filterChallenges();

        if (this.props.sortOption) {
            if (typeof this.props.sortOption.sort === 'function') {
                challenges = this.props.sortOption.sort(challenges);
            }
        }

        return (
            <div className="container">
                <EventTimer event={this.props.user.event} />
                <div className="Challenges--submissions-wrapper">
                    <SubmissionsBlock challenges={this.props.data.allChallenges} />
                </div>
                <div className="Challenges--filters-wrapper">
                    <DifficultyFilters
                        difficulties={this.props.difficultyFilters.available}
                        selectedDifficulties={this.props.difficultyFilters.selected}
                        onChange={data => this.props.setSelectedDifficultyFilters(data)}
                    />
                    <CategoryFilters
                        categories={this.props.categoryFilters.available}
                        selectedCategories={this.props.categoryFilters.selected}
                        onChange={data => this.props.setSelectedCategoryFilters(data)}
                    />
                </div>
                <div>
                    <SortOptions
                        selectedSort={this.props.sortOption ? this.props.sortOption : undefined}
                        onChange={sortOption => this.props.setSelectedSort(sortOption)}
                    />
                </div>
                <div className="Challnges--filters-wrapper">
                    <div>
                        <span>Hide challenges you've already submitted</span>
                        <Switch
                            onChange={e => {
                                this.props.toggleHideSubmitted(e.target.checked);
                            }}
                            checked={this.props.hideSubmitted ? this.props.hideSubmitted : false}
                            value={"Hide challenges you've already submitted"}
                            color="primary"
                        />
                    </div>
                </div>
                <div className="Challenges--challenges-wrapper col-xs-12">
                    <ChallengeGrid challenges={challenges} showEmptyText={true} />
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
            techRaceOnly
            isPublished
        }
        _allChallengesMeta {
            count
        }
    }
`;

const mapStateToProps = state => ({
    categoryFilters: state.user.categoryFilters,
    difficultyFilters: state.user.difficultyFilters,
    hideSubmitted: state.user.hideSubmitted,
    sortOption: state.user.sortOption,
    user: state.user.user,
    submissions: state.user.submissions.data
});

const mapDispatchToProps = dispatch => ({
    setAvailableCategoryFilters: categories => dispatch(UserActions.setAvailableCategoryFilters(categories)),
    setSelectedCategoryFilters: categories => dispatch(UserActions.setSelectedCategoryFilters(categories)),
    setAvailableDifficultyFilters: difficulties => dispatch(UserActions.setAvailableDifficultyFilters(difficulties)),
    setSelectedDifficultyFilters: difficulties => dispatch(UserActions.setSelectedDifficultyFilters(difficulties)),
    setSelectedSort: sortOption => dispatch(UserActions.setSelectedSort(sortOption)),
    updateUserWithToken: token => dispatch(UserActions.updateUserWithToken(token)),
    toggleHideSubmitted: value => dispatch(UserActions.setUserHideSubmitted(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(graphql(allChallenges)(Home));
