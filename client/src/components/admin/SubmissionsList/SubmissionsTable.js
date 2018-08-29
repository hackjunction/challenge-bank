import React from 'react';
import { render } from 'react-dom';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class SubmissionsTable extends React.Component {
    render() {
        const COLUMNS = [
            {
                Header: 'Challenge',
                columns: [
                    {
                        Header: 'Name',
                        id: 'challengeName',
                        accessor: d => d.challenge.name
                    },
                    {
                        Header: 'Difficulty',
                        id: 'challengeDifficulty',
                        accessor: d => {
                            return `${d.challenge.challengeDifficulty.name}`;
                        }
                    },
                    {
                        Header: 'Category',
                        id: 'challengeCategory',
                        accessor: d => {
                            return d.challenge.challengeCategory.name;
                        }
                    }
                ]
            },
            {
                Header: 'Submission',
                columns: [
                    {
                        Header: 'Answer',
                        accessor: 'answer'
                    },
                    {
                        Header: 'Time',
                        accessor: 'timestamp'
                    }
                ]
            },
            {
                Header: 'Review',
                columns: [
                    {
                        Header: 'Correct answer',
                        id: 'correctAnswer',
                        accessor: d => d.challenge.answer
                    },
                    {
                        Header: 'Options',
                        id: 'options',
                        Cell: props => {
                            return (
                                <div className="SubmissionsTable--options">
                                    <a className="SubmissionsTable--option decline">Decline</a>
                                    <a className="SubmissionsTable--option accept">Accept</a>
                                </div>
                            );
                        }
                    }
                ]
            }
        ];

        return (
            <div className="col-xs-12">
                <ReactTable
                    data={this.props.data}
                    columns={COLUMNS}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default SubmissionsTable;
