import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Markdown from 'react-markdown';

const Challenge = ({ data: { loading, error, Challenge } }) => {
  if (error) return <h1>Error fetching the challenge!</h1>;
  if (!loading) {
    return (
      <article>
        <h1>{Challenge.name}</h1>
        <div className="challenge-placeholder" />
        <Markdown source={Challenge.shortDescription} escapeHtml={false} />
      </article>
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
