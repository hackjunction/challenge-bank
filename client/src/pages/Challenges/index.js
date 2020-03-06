import React from "react";
import styles from "./Challenges.module.scss";

import SubmissionsTable from "components/SubmissionsTable";
import ChallengeGrid from "components/ChallengeGrid";
import ChallengeGridFilters from "components/ChallengeGridFilters";
import CenteredContainer from "components/CenteredContainer";
import Divider from "components/Divider";

const Challenges = () => {
  return (
    <CenteredContainer>
      <Divider size={1} />
      <SubmissionsTable />
      <Divider size={1} />
      <ChallengeGridFilters />
      <Divider size={1} />
      <ChallengeGrid />
      <Divider size={2} />
    </CenteredContainer>
  );
};

export default Challenges;
