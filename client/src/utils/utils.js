const Utils = {
  calculateTotalPoints: (submissions, challenges) => {
    const byChallenge = {};
    submissions.forEach(submission => {
      if (byChallenge.hasOwnProperty(submission.challenge)) {
        if (submission.reviewStatus === 2) {
          byChallenge[submission.challenge] = submission;
        }
      } else {
        byChallenge[submission.challenge] = submission;
      }
    });
    let totalPoints = 0;
    Object.keys(byChallenge).forEach(challengeId => {
      const reviewStatus = byChallenge[challengeId].reviewStatus;
      const newPoints = Utils.getPointsForStatus(
        reviewStatus,
        challenges,
        challengeId
      );
      totalPoints += newPoints;
    });

    return totalPoints;
  },
  getPointsForStatus: (status, challenges, challengeId) => {
    const challenge = challenges[challengeId];
    const points = challenge ? challenge.difficulty.pointValue : 0;

    switch (status) {
      case 0:
        return 0;
      case 1:
        return points * 0.5;
      case 2:
        return points;
      case 3:
        return 0;
      default:
        return 0;
    }
  }
};

export default Utils;
