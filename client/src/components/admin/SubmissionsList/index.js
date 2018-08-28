import React, { Component } from 'react';
import _ from 'lodash';
import './style.css';

class SubmissionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            submissions: []
        };
    }

    async componentWillMount() {
        this.getSubmissions();
    }

    async getSubmissions() {
        this.setState({
            loading: true
        });

        try {
            const response = await fetch('/api/submissions');
            const body = await response.json();

            if (body.status === 'success') {
                this.setState({
                    loading: false,
                    submissions: body.data,
                    error: null
                });
            } else {
                this.setState({
                    loading: false,
                    error: body.data
                });
            }
        } catch (error) {
            console.log(error);
            this.setState({
                loading: false,
                error: error
            });
        }
    }

    renderSubmissions() {
        console.log('Submissions', this.state.submissions);
        return _.map(this.state.submissions, submission => {
            return (
                <div className="SubmissionsList--item-wrapper">
                    <p className="SubmissionsList--item-title">{submission.answer}</p>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="SubmissionsList--container container">
                <h1 className="SubmissionsList--title">Submissions</h1>
                {this.renderSubmissions()}
            </div>
        );
    }
}

export default SubmissionsList;
