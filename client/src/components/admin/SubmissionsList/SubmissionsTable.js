import React from 'react';
import { render } from 'react-dom';
import './style.css';
// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import Markdown from 'react-markdown';

class SubmissionsTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderDesc = this.renderDesc.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
  }

  renderTooltip(title, desc) {
    return (
      <Tooltip
        position="right"
        trigger="click"
        arrow
        size="big"
        theme="transparent"
        duration={100}
        interactive
        html={this.renderDesc(desc)}
      >
        {title}
      </Tooltip>
    );
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
              return this.renderTooltip(
                d.challenge.name,
                d.challenge.description
              );
            }
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
            accessor: d => {
              return this.renderTooltip(d.challenge.answer, d.challenge.answer);
            }
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
