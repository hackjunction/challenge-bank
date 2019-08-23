import React from 'react';
import './style.css';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'react-tippy/dist/tippy.css';
import Markdown from 'react-markdown';
import TimeAgo from 'react-timeago';
import ReviewConstants from '../../../constants/review';

class SubmissionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.renderDesc = this.renderDesc.bind(this);
    }

    onSelect(props) {
        this.props.onSelect(props);
    }

    renderDesc(props) {
        return <Markdown source={props} escapeHtml={false} />;
    }
    render() {
        const COLUMNS = [
            {
                Header: 'Challenge',
                columns: [
                    {
                        Header: 'Name',
                        id: 'challengeName',
                        accessor: d => {
                            return d.challenge ? `${d.challenge.name}` : '???';
                        }
                    },
                    {
                        Header: 'Difficulty',
                        id: 'challengeDifficulty',
                        accessor: d => {
                            return d.challenge ? `${d.challenge.challengeDifficulty.name}` : '???';
                        }
                    },
                    {
                        Header: 'Category',
                        id: 'challengeCategory',
                        accessor: d => {
                            return d.challenge ? d.challenge.challengeCategory.name : '???';
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
                        id: 'timestamp',
                        accessor: 'timestamp',
                        Cell: props => {
                            return <TimeAgo date={props.row.timestamp} />;
                        }
                    },
                    {
                        Header: 'User',
                        id: 'user',
                        accessor: 'user.username'
                    }
                ]
            },
            {
                Header: 'Review',
                columns: [
                    {
                        Header: 'Status',
                        id: 'reviewStatus',
                        accessor: d =>
                            ReviewConstants.Status[d.reviewStatus] ? ReviewConstants.Status[d.reviewStatus].name : 0,
                        Cell: props => {
                            return (
                                <div className="SubmissionsTable--options">
                                    <span className={'SubmissionsTable--review-status ' + props.value}>
                                        {props.value}
                                    </span>
                                </div>
                            );
                        }
                    },
                    {
                        Header: 'Options',
                        id: 'options',
                        Cell: props => {
                            return (
                                <div className="SubmissionsTable--options">
                                    <span
                                        className="SubmissionsTable--option review"
                                        onClick={() => this.onSelect(props.row._original)}
                                    >
                                        Review
                                    </span>
                                </div>
                            );
                        }
                    }
                ]
            }
        ];

        return (
            <div className="row">
                <div className="col-xs-12">
                    <ReactTable
                        data={this.props.data}
                        columns={COLUMNS}
                        defaultPageSize={100}
                        className="-striped -highlight"
                    />
                </div>
            </div>
        );
    }
}

export default SubmissionsTable;
