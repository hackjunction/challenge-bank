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
      filters: []
    };
  }

  checkFunction(difficulty) {
    if (this.state.filters.includes(difficulty)) {
      this.setState({
        filters: _.pull(this.state.filters, difficulty)
      });
    } else {
      this.setState({
        filters: _.concat(this.state.filters, difficulty)
      });
    }
  }

  renderChallenges() {
    let filtered;
    if (this.state.filters.length === 0) {
      filtered = this.props.data.allChallenges;
    } else {
      filtered = _.filter(this.props.data.allChallenges, challenge => {
        return this.state.filters.includes(challenge.challengeDifficulty.name);
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

  renderFilters() {
    const allFilters = _.uniq(
      _.map(this.props.data.allChallenges, "challengeDifficulty.name")
    );
    return _.map(allFilters, filter => {
      return (
        <div>
          <label> {filter} </label>
          <input
            type="checkbox"
            checked={this.state.filters.includes(filter)}
            onChange={() => this.checkFunction(filter)}
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
        <div className="filterButtons"> {this.renderFilters()} </div>
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
