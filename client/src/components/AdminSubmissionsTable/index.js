import React, { useEffect, useState, useMemo } from "react";
import styles from "./AdminSubmissionsTable.module.scss";

import { connect } from "react-redux";
import { Table, notification, Radio, Badge } from "antd";
import { sortBy, reverse } from "lodash-es";
import moment from "moment";

import StatusBadge from "components/StatusBadge";
import AdminSubmissionDetail from "components/AdminSubmissionDetail";

import * as AuthSelectors from "redux/auth/selectors";
import * as ContentSelectors from "redux/content/selectors";
import SubmissionsService from "services/submissions";

const AdminSubmissionsTable = ({
  token,
  submissions,
  challenges,
  loading,
  reload
}) => {
  const [showUnreviewedOnly, setShowUnreviewedOnly] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);
  const formatChallenge = challengeId => {
    if (challenges.hasOwnProperty(challengeId)) {
      return challenges[challengeId].name;
    }
    return "???";
  };

  const formatTimestamp = date => {
    return moment(date).fromNow();
  };

  const formattedData = useMemo(() => {
    const filtered = submissions.filter(submission => {
      if (showUnreviewedOnly && submission.reviewStatus !== 0) {
        return false;
      }
      return true;
    });

    const mapped = filtered.map(submission => {
      return {
        ...submission,
        challenge: challenges[submission.challenge]
          ? challenges[submission.challenge]
          : {},
        createdAt: moment(submission.createdAt).fromNow(),
        timestamp: submission.createdAt
      };
    });

    return reverse(sortBy(mapped, "timestamp"));
  }, [submissions, showUnreviewedOnly]);

  return (
    <React.Fragment>
      <div className={styles.options}>
        <Radio.Group
          value={showUnreviewedOnly}
          onChange={e => setShowUnreviewedOnly(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value={true}>Un-reviewed only</Radio.Button>
          <Radio.Button value={false}>All submissions</Radio.Button>
        </Radio.Group>
      </div>
      <Table
        rowKey="_id"
        dataSource={formattedData}
        loading={loading}
        expandedRowRender={submission => (
          <AdminSubmissionDetail
            submission={submission}
            onDone={() => {
              setExpandedRows([]);
              reload();
            }}
          />
        )}
        expandRowByClick={true}
        expandedRowKeys={expandedRows}
        onExpand={(expanded, record) =>
          expanded ? setExpandedRows([record._id]) : setExpandedRows([])
        }
      >
        <Table.Column
          title="Challenge"
          dataIndex="challenge"
          key="challenge"
          render={challenge => challenge.name}
        />
        <Table.Column title="User" dataIndex="user" key="user" />
        <Table.Column title="Time" dataIndex="createdAt" key="createdAt" />
        <Table.Column
          title="Category"
          dataIndex="challenge.category"
          key="category"
          render={(category = {}) => {
            return (
              <span>
                <Badge color={category.color} />
                {category.name}
              </span>
            );
          }}
        />
        <Table.Column
          title="Status"
          dataIndex="reviewStatus"
          key="reviewStatus"
          render={status => <StatusBadge status={status} />}
        />
      </Table>
    </React.Fragment>
  );
};

const mapState = state => ({
  token: AuthSelectors.token(state)
});

export default connect(mapState)(AdminSubmissionsTable);
