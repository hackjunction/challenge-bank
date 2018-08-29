import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Markdown from 'react-markdown';
import './style.css';

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

        if (error) return <h1>Error fetching the challenge!</h1>;
        if (!loading) {
            return (
                <div>
                    <div className="challenge-cointainer box">
                        <div className="challenge-header">
                            <h5>{Challenge.name}</h5>
                            <div className="flexrow">
                                <b
                                    style={{
                                        color: `rgba(${Object.values(
                                            JSON.parse(Challenge.challengeCategory.color)
                                        ).join(',')})`
                                    }}
                                >
                                    {Challenge.challengeCategory.name}
                                </b>
                                <p>{Challenge.challengeDifficulty.name}</p>
                            </div>
                        </div>
                        <Markdown className="challenge-desc box" source={Challenge.description} escapeHtml={false} />
                    </div>
                    {this.state.submitted ? (
                        <div className="submit-container box">
                            <h5>Success! Thanks for submitting an answer</h5>
                        </div>
                    ) : (
                        <div className="submit-container box">
                            <h5>Submit new answer</h5>
                            {this.state.error ? <p className="submit-error">Oops, something went wrong</p> : null}
                            <textarea className="inputfield" onChange={this.onAnswerChange} value={this.state.answer} />
                            <button onClick={this.onSubmit}>Submit</button>
                        </div>
                    )}
                </div>
            );
        }
        return <h2>Loading challenge...</h2>;
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
