import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const Home = ({ data: { loading, error, allChallenges } }) => {
  if (error) return <h1>Error fetching challenges!</h1>;
  if (!loading) {
    return (
      <section>
        <p>
          <input
            type="checkbox"
            // defaultChecked={false}
            onChange={checkFunction("easy")}
          />{" "}
          Easy
          <input
            type="checkbox"
            // defaultChecked={false}
            onChange={checkFunction("medium")}
          />{" "}
          Medium
          <input
            type="checkbox"
            // defaultChecked={false}
            onChange={checkFunction("hard")}
          />{" "}
          Hard
        </p>
        <h2>{filterBy}</h2>
        <ul className="Home-ul">
          {allChallenges.map(challenge => filtered(challenge))}
        </ul>
      </section>
    );
  }
  return <h2>Loading challenges...</h2>;
};

function checkFunction(difficulty) {
  if (filterBy.includes(difficulty)) {
    filterBy.pop(difficulty);
  } else {
    filterBy.push(difficulty);
  }
}

const filterBy = [];

function filtered(challenge) {
  if (filterBy.includes(challenge.diffulty)) {
    return (
      <li className="Home-li" key={`challenge-${challenge.id}`}>
        <Link to={`/challenge/${challenge.id}`} className="Home-link">
          <div className="Home-placeholder" />
          <h3>{challenge.name}</h3>
        </Link>
      </li>
    );
  } else {
    return;
  }
  //return allChallenges.filter(challenge =>
  //filterBy.includes(challenge.diffulty)
  //);
}
//const challengesInpage = filtered();
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
