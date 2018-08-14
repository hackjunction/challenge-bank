import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    const allCategories = _.uniq(
      _.map(this.props.data.allChallenges, "challengeCategory.name")
    );
    return _.map(allCategories, filter => {
      return (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.categories.includes(filter)}
                onChange={() => this.checkCategory(filter)}
              />
            }
            label={filter}
          />
        </div>
      );
    });
  }

  renderDifficultyfilters() {
    const allDifficulties = _.uniq(
      _.map(
        _.sortBy(_.map(this.props.data.allChallenges, "challengeDifficulty"), [
          function(o) {
            return o.difficultyvalue;
          }
        ]),
        difficulty => {
          return difficulty.name;
        }
      )
    );
    return _.map(allDifficulties, filter => {
      return (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.difficulties.includes(filter)}
                onChange={() => this.checkDifficulty(filter)}
                color="primary"
              />
            }
            label={filter}
          />
        </div>
      );
    });
  }

  renderChallenges() {
    let filtered;
    if (this.state.difficulties.length === 0) {
      filtered = this.props.data.allChallenges;
    } else {
      filtered = _.filter(this.props.data.allChallenges, challenge => {
        return this.state.difficulties.includes(
          challenge.challengeDifficulty.name
        );
      });
    }
    if (this.state.categories.length !== 0) {
      filtered = _.filter(filtered, challenge => {
        return this.state.categories.includes(challenge.challengeCategory.name);
      });
    }
    return (
      <div className="container">
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
                        ).join(",")})`
                      }}
                    >
                      <b>{challenge.challengeCategory.name}</b>
                    </p>
                    <p className="difficulty">
                      {challenge.challengeDifficulty.name}
                    </p>
                  </div>
                  <h5>
                    <b>{challenge.name}</b>
                  </h5>
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
      </div>
    );
  }

  render() {
    const { error, loading, allChallenges } = this.props.data;
    if (error) return <h1>Error fetching challenges!</h1>;
    if (loading) return <h2>Loading challenges...</h2>;
    return (
      <div className="filtercontainer">
        <p>Select categories</p>
        <div className="categoryButtons"> {this.renderCategoryfilters()} </div>
        <p>Select difficulties</p>
        <div className="difficultyButtons">
          {" "}
          {this.renderDifficultyfilters()}{" "}
        </div>
        <ul>{this.renderChallenges()}</ul>
      </div>
    );
  }
}

export const allChallenges = gql`
  query allChallenges {
    allChallenges {
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
    }
    _allChallengesMeta {
      count
    }
  }
`;

export default graphql(allChallenges)(Home);
