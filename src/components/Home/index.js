import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import "./style.css";

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
    return _.map(filtered, challenge => {
      return (
        <li className="Home-li" key={`challenge-${challenge.id}`}>
          <Link to={`/challenge/${challenge.id}`} className="Home-link">
            <div className="Home-placeholder" />
            <h3>{challenge.name}</h3>
          </Link>
        </li>
      );
    });
  }

  renderCategoryfilters() {
    const allCategories = _.uniq(
      _.map(this.props.data.allChallenges, "challengeCategory.name")
    );
    return _.map(allCategories, filter => {
      return (
        <div>
          <label> {filter} </label>
          <input
            type="checkbox"
            checked={this.state.categories.includes(filter)}
            onChange={() => this.checkCategory(filter)}
          />
        </div>
      );
    });
  }

  renderDifficultyfilters() {
    const allDifficulties = _.uniq(
      _.map(this.props.data.allChallenges, "challengeDifficulty.name")
    );
    return _.map(allDifficulties, filter => {
      return (
        <div>
          <label> {filter} </label>
          <input
            type="checkbox"
            checked={this.state.difficulties.includes(filter)}
            onChange={() => this.checkDifficulty(filter)}
          />
        </div>
      );
    });
  }

  render() {
    const { error, loading, allChallenges } = this.props.data;
    if (error) return <h1>Error fetching challenges!</h1>;
    if (loading) return <h2>Loading challenges...</h2>;
    return (
      <section>
        <div className="categoryButtons"> {this.renderCategoryfilters()} </div>
        <div className="difficultyButtons">
          {" "}
          {this.renderDifficultyfilters()}{" "}
        </div>
        <ul className="Home-ul">{this.renderChallenges()}</ul>
      </section>
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
