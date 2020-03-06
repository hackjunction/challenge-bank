import React, { useMemo } from "react";
import styles from "./AdminResultsTable.module.scss";

import { groupBy, sortBy } from "lodash-es";
import { Table } from "antd";

import Utils from "utils/utils";

const AdminResultsTable = ({ submissions, challenges }) => {
  const results = useMemo(() => {
    const submissionsByUser = groupBy(submissions, "user");
    const pointsByUser = [];

    Object.keys(submissionsByUser).forEach(user => {
      pointsByUser.push({
        username: user,
        points: Utils.calculateTotalPoints(submissionsByUser[user], challenges),
        numSubmissions: submissionsByUser[user].length
      });
    });

    return sortBy(pointsByUser, item => item.points * -1);
  });

  return (
    <Table dataSource={results}>
      <Table.Column title="User" dataIndex="username" />
      <Table.Column title="Submissions" dataIndex="numSubmissions" />
      <Table.Column title="Points" dataIndex="points" />
    </Table>
  );
};

export default AdminResultsTable;
