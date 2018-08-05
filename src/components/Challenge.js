import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Markdown from 'react-markdown';

const Challenge = ({ data: { loading, error, Challenge } }) => {
  if (error) return <h1>Error fetching the challenge!</h1>;
  if (!loading) {
    return (
      <div className="challenge-cointainer">
        <h2>{Challenge.name}</h2>
        <p>{Challenge.challengeDifficulty.name}</p>
        <p>{Challenge.challengeCategory.name}</p>
        <div className="challenge-desc">
        <Markdown source={Challenge.description} escapeHtml={false} />
        </div>
      </div>
    );
  }
  return <h2>Loading challenge...</h2>;
};

export const singleChallenge = gql`
  query singleChallenge($id: ID!) {
    Challenge(id: $id) {
      id
      name
      shortDescription
      description
      challengeDifficulty {
        name
      }
      challengeCategory {
        name
      }
    }
  }
`;

export default graphql(singleChallenge, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(Challenge);
