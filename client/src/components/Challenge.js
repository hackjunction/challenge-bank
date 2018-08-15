import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Markdown from 'react-markdown';

const Challenge = ({ data: { loading, error, Challenge } }) => {
  if (error) return <h1>Error fetching the challenge!</h1>;
  if (!loading) {
    return (
      <div className="challenge-cointainer">
        <div className="challenge-header">
          <h5
            style={{
              color: `rgba(${Object.values(
                JSON.parse(Challenge.challengeCategory.color)
              ).join(',')})`
            }}
          >
            {Challenge.name}
          </h5>
          <div className="flexrow">
            <p>{Challenge.challengeCategory.name}</p>
            <p>{Challenge.challengeDifficulty.name}</p>
          </div>
        </div>
        <Markdown
          className="challenge-desc"
          source={Challenge.description}
          escapeHtml={false}
        />
        <h5>Submit new answer</h5>
        <textarea className="inputfield" />
        <button>Submit</button>
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
        color
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
