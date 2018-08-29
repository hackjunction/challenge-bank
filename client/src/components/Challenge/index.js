import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Markdown from 'react-markdown';
import './style.css';
import _ from 'lodash';

class Challenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      submitted: false,
      error: ''
    };

    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onAnswerChange(event) {
    this.setState({ answer: event.target.value });
  }

  async onSubmit() {
    this.setState({
      loading: true
    });

    const response = await fetch('/api/submissions', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        submission: {
          answer: this.state.answer,
          challengeId: this.props.data.Challenge.id
        }
      })
    });

    const body = await response.json();

    if (body.status === 'success') {
      this.setState({
        loading: false,
        submitted: true
      });
    } else {
      this.setState({
        loading: false,
        submitted: false,
        error: body.data
      });
    }
  }

  render() {
    const { error, loading, Challenge } = this.props.data;
    console.log(this.props.data);

    if (error) return <h1>Error fetching the challenge!</h1>;
    if (loading) return <h1>Loading challenge...</h1>;

    const categoryStyle = {
      color: `rgba(${Object.values(
        JSON.parse(Challenge.challengeCategory.color)
      ).join(',')})`
    };

    return (
      <div className="container">
        <Link to={`/challenges/`} className="Challenge--challenges">
          Back to Challenge list
        </Link>
        <div className="Challenge--container">
          <div className="Challenge--header">
            <span className="Challenge--category" style={{ color: 'green' }}>
              {Challenge.challengeCategory.name}
            </span>
            <span className="Challenge--difficulty">
              {Challenge.challengeDifficulty.name}
            </span>
          </div>
          <div className="Challenge--content">
            <h1 className="Challenge--name">{Challenge.name}</h1>
            <Markdown
              className="Challenge--description"
              source={Challenge.description}
              escapeHtml={false}
            />
            {_.map(Challenge.attachments, attachment => (
              <a
                href={attachment.url}
                download={attachment.fileName}
                target="_blank"
              >
                {attachment.fileName}
              </a>
            ))}
          </div>
          {this.state.submitted ? (
            <div className="Challenge--submit">
              <h3 className="Challenge--submitted">
                Thanks for submitting your answer!
              </h3>
            </div>
          ) : (
            <div className="Challenge--submit">
              <input
                className="Challenge--submit-answer"
                onChange={this.onAnswerChange}
                value={this.state.answer}
                placeholder={'Type your answer here'}
              />
              <button
                className="Challenge--submit-button"
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <h1 className="Challenge--challenges">
          See More {Challenge.challengeCategory.name} Challenges:
        </h1>
      </div>
    );
  }
}

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
      attachments {
        id
        fileName
        url
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
