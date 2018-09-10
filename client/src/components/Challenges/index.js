import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ClipLoader, BarLoader } from 'react-spinners';
import _ from 'lodash';
import './style.css';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulties: [],
      categories: []
    };
  }

  checkDifficulty(difficulty) {
    if (this.state.difficulties.includes(difficulty)) {
      this.setState({
        difficulties: _.pull(this.state.difficulties, difficulty)
      });
    } else {
      this.setState({
        difficulties: _.concat(this.state.difficulties, difficulty)
      });
    }
  }

  checkCategory(category) {
    if (this.state.categories.includes(category)) {
      this.setState({
        categories: _.pull(this.state.categories, category)
      });
    } else {
      this.setState({
        categories: _.concat(this.state.categories, category)
      });
    }
  }

  renderCategoryfilters() {
    const allCategories = _.filter(
      _.uniq(_.map(this.props.data.allChallenges, 'challengeCategory.name')),
      filter => {
        return filter;
      }
    );
    return _.map(allCategories, filter => {
      return (
        <label className="filteritem">
          <div className="checkboxcontainer">
            <input
              type="checkbox"
              checked={this.state.categories.includes(filter)}
              onChange={() => this.checkCategory(filter)}
            />
            <span className="checkmark" />
          </div>
          {filter}
        </label>
      );
    });
  }

  renderDifficultyfilters() {
    const allDifficulties = _.uniq(
      _.map(
        _.sortBy(_.map(this.props.data.allChallenges, 'challengeDifficulty'), [
          function(o) {
            if (o) {
              return o.difficultyvalue;
            }
          }
        ]),
        difficulty => {
          if (difficulty && difficulty.name) {
            return difficulty.name;
          }
        }
      )
    );
    return _.map(allDifficulties, filter => {
      if (filter) {
        return (
          <label className="filteritem">
            <div className="checkboxcontainer">
              <input
                type="checkbox"
                checked={this.state.difficulties.includes(filter)}
                onChange={() => this.checkDifficulty(filter)}
              />
              <span className="checkmark" />
            </div>
            {filter}
          </label>
        );
      }
    });
  }

  renderChallenges() {
    let filtered;
    if (this.state.difficulties.length === 0) {
      filtered = _.filter(this.props.data.allChallenges, challenge => {
        return challenge.challengeCategory && challenge.challengeDifficulty;
      });
    } else {
      filtered = _.filter(this.props.data.allChallenges, challenge => {
        if (challenge.challengeDifficulty) {
          return (
            this.state.difficulties.includes(
              challenge.challengeDifficulty.name
            ) &&
            challenge.challengeCategory &&
            challenge.challengeDifficulty
          );
        }
      });
    }

    if (this.state.categories.length !== 0) {
      filtered = _.filter(filtered, challenge => {
        return this.state.categories.includes(challenge.challengeCategory.name);
      });
    }
    if (filtered.length !== 0) {
      return (
        <div className="row">
          <div className="grid">
            {_.map(filtered, challenge => (
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
                    <p className="difficulty">
                      {challenge.challengeDifficulty.name}
                    </p>
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
    } else {
      return (
        <div className="row">
          <h5>No challenges found with given parameters!</h5>
        </div>
      );
    }
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
          <Link
            to="/challenges"
            onClick={() => window.location.reload()}
            className="errorLink"
          >
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
    const { submissions } = this.props;
    if (error) return this.renderError();
    if (loading) return this.renderLoading();
    return (
      <div className="container">
        {submissions.length !== 0
          ? (console.log(submissions),
            (
              <React.Fragment>
                <h5>Your own submissions</h5>
                <div className="row">
                  <div className="grid">
                    {_.map(submissions, submission => (
                      <div className="grid-item">
                        <div className="grid-content">
                          <React.Fragment>
                            <h5>
                              {_.result(
                                _.find(this.props.data.allChallenges, function(
                                  obj
                                ) {
                                  return obj.id === submission[0].challengeId;
                                }),
                                'name'
                              )}
                            </h5>
                            <p>Answer: {submission[0].answer}</p>
                            <p>Feedback: {submission[0].reviewFeedback}</p>
                            <p>Status: {submission[0].reviewStatus}</p>
                          </React.Fragment>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))
          : null}
        <h5>Filter Challenges by Difficulty</h5>
        <div className="filterboxes">{this.renderDifficultyfilters()}</div>
        <h5>Filter Challenges by Category</h5>
        <div className="filterboxes">{this.renderCategoryfilters()}</div>
        {this.renderChallenges()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  submissions: state.submissions.submissions
});

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

export default connect(mapStateToProps)(graphql(allChallenges)(Home));
